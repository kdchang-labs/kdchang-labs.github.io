#!/usr/bin/env node
/**
 * Generates a 1200x630 social card (Open Graph / Twitter) for every page of
 * the built site, using the page's own title and description. Ported from
 * ai.kdchang.com so the KD sites share one card layout; only the colors and
 * labels differ.
 *
 *   npm run og        # builds the site, generates cards, rebuilds
 *
 * Output: static/img/og/<locale>/<slug>.png plus static/img/og/manifest.json,
 * which src/lib/ogImage.ts reads. The PNGs are committed, so deploys never need
 * Chrome. Run it again after adding pages or changing titles.
 *
 * Needs Google Chrome; set CHROME_PATH if it is not in the default location.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(root, "build");
const outDir = path.join(root, "static/img/og");
const iconUrl = `file://${path.join(root, "static/img/icon-512.png")}`;

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const SITE = "KD LABs";
const HOST = "labs.kdchang.com";

// "\n" in a home title sets the line break; the card renders it with pre-line.
const LOCALES = {
  "zh-Hant": {
    dir: buildDir,
    sections: {
      blog: "文章",
      resources: "學習資源",
      products: "產品介紹",
      about: "關於我們",
    },
    home: {
      eyebrow: "獨立產品工作室",
      title: "從一個具體的問題開始，\n做出每天用得上的產品",
    },
  },
  en: {
    dir: path.join(buildDir, "en"),
    sections: {
      blog: "Blog",
      resources: "Resources",
      products: "Products",
      about: "About",
    },
    home: {
      eyebrow: "Independent product studio",
      title: "Start with one real problem,\nbuild products people use every day",
    },
  },
};

/** Listing pages that only repeat other pages; they keep the default card. */
const SKIP = /(^|\/)(tags|authors|archive|page|search|404)(\/|$)/;

function ogSlug(p) {
  const clean = p.replace(/\/+$/, "");
  return clean === "" ? "home" : clean.slice(1).replace(/\//g, "--");
}

function htmlFiles(dir, skipDirs) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory())
      return skipDirs.includes(full) ? [] : htmlFiles(full, skipDirs);
    return e.name.endsWith(".html") ? [full] : [];
  });
}

/** build/foo/bar.html -> /foo/bar, build/foo/index.html -> /foo */
function pagePath(file, dir) {
  const rel = path.relative(dir, file).replace(/\\/g, "/");
  return `/${rel.replace(/(^|\/)index\.html$/, "").replace(/\.html$/, "")}`;
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function meta(html, attr, name) {
  const m = html.match(
    new RegExp(`<meta[^>]*${attr}="${name}"[^>]*content="([^"]*)"`),
  );
  return m ? decode(m[1]) : "";
}

function card({ eyebrow, title, description, lang }) {
  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    background: #0d0d0e;
    color: #ededea;
    font-family: -apple-system, "PingFang TC", "Noto Sans TC", "Helvetica Neue", sans-serif;
    padding: 64px 72px;
    display: flex;
    flex-direction: column;
  }
  .brand { display: flex; align-items: center; gap: 16px; font-size: 28px; font-weight: 700; letter-spacing: 0.03em; }
  .brand img { width: 56px; height: 56px; border-radius: 12px; border: 1.5px solid #3a3a3f; }
  .main { margin-top: auto; margin-bottom: auto; }
  .eyebrow { font-size: 26px; font-weight: 600; color: #a3a39e; margin-bottom: 20px; }
  h1 {
    font-size: ${title.length > 60 ? 50 : title.length > 26 ? 56 : 66}px; font-weight: 700; line-height: 1.25; letter-spacing: -0.01em; white-space: pre-line;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }
  p {
    margin-top: 22px; font-size: 27px; line-height: 1.55; color: #a3a39e;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .footer { display: flex; justify-content: space-between; padding-top: 24px; border-top: 1px solid #26262a; font-size: 24px; color: #727270; }
</style></head><body>
  <div class="brand"><img src="${iconUrl}" alt="">${SITE}</div>
  <div class="main">
    ${eyebrow ? `<div class="eyebrow">${escape(eyebrow)}</div>` : ""}
    <h1>${escape(title)}</h1>
    ${description ? `<p>${escape(description)}</p>` : ""}
  </div>
  <div class="footer"><span>${HOST}</span><span>by KD Chang</span></div>
</body></html>`;
}

if (!fs.existsSync(buildDir)) {
  console.error("No build/ directory. Run `npm run build` first.");
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "og-"));
const manifest = {};

for (const [locale, cfg] of Object.entries(LOCALES)) {
  // build/en/ sits inside build/; keep it out of the zh-Hant pass.
  const otherLocaleDirs = Object.values(LOCALES)
    .map((c) => c.dir)
    .filter((d) => d !== cfg.dir && d.startsWith(cfg.dir));
  const target = path.join(outDir, locale);
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(target, { recursive: true });
  manifest[locale] = [];

  // Page titles are "<page> | <site title>"; strip the site title exactly,
  // since it may itself contain " | ".
  const siteTitle = decode(
    fs
      .readFileSync(path.join(cfg.dir, "index.html"), "utf8")
      .match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? "",
  );

  for (const file of htmlFiles(cfg.dir, otherLocaleDirs).sort()) {
    const pagePathname = pagePath(file, cfg.dir);
    if (SKIP.test(pagePathname.slice(1))) continue;

    const html = fs.readFileSync(file, "utf8");
    const slug = ogSlug(pagePathname);
    const section = pagePathname.split("/")[1];
    const fullTitle = decode(
      html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? "",
    );
    const description = meta(html, "name", "description");

    let data;
    if (slug === "home") {
      data = { ...cfg.home, description };
    } else {
      const suffix = ` | ${siteTitle}`;
      const title = fullTitle.endsWith(suffix)
        ? fullTitle.slice(0, -suffix.length)
        : fullTitle;
      data = { eyebrow: cfg.sections[section] ?? "", title, description };
    }
    if (!data.title) continue;

    const htmlFile = path.join(tmp, `${locale}-${slug}.html`);
    fs.writeFileSync(htmlFile, card({ ...data, lang: locale }));
    const png = path.join(target, `${slug}.png`);
    execFileSync(
      CHROME,
      [
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        "--allow-file-access-from-files",
        "--window-size=1200,630",
        `--screenshot=${png}`,
        `file://${htmlFile}`,
      ],
      { stdio: "ignore" },
    );
    manifest[locale].push(slug);
    console.log(`${locale} ${pagePathname} -> ${path.relative(root, png)}`);
  }
}

fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
fs.rmSync(tmp, { recursive: true, force: true });
console.log(
  `\n${Object.values(manifest).flat().length} cards written. Rebuild to use them.`,
);
