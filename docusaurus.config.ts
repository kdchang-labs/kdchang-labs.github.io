import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Docusaurus runs this config once per locale, so site-level metadata that
// cannot go through the i18n JSON files (title / tagline / social card) is
// switched here instead. Same approach as ai.kdchang.com.
const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? "zh-Hant";
const isEn = currentLocale === "en";

const config: Config = {
  title: isEn ? "KD LABs | A Lab for Builders" : "KD LABs 建構者的實驗室",
  tagline: isEn
    ? "Building products that solve real problems at work and in life, for a more open and better world."
    : "致力於打造解決人們工作和生活問題的產品，讓這個世界更開放美好",
  favicon: "/img/favicon.ico",
  headTags: [
    {
      tagName: "link",
      attributes: { rel: "apple-touch-icon", href: "/img/apple-touch-icon.png" },
    },
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://labs.kdchang.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  trailingSlash: false,
  deploymentBranch: "gh-pages",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "kdchang-labs", // Usually your GitHub org/user name.
  projectName: "kdchang-labs.github.io", // repo
  onBrokenLinks: "throw",

  // Traditional Chinese is served at /, English at /en/. Translations live in
  // i18n/en/ (pages, blog posts, docs, and the JSON files for UI strings).
  i18n: {
    defaultLocale: "zh-Hant",
    locales: ["zh-Hant", "en"],
    localeConfigs: {
      "zh-Hant": {
        label: "繁體中文",
        htmlLang: "zh-Hant-TW",
        direction: "ltr",
      },
      en: {
        label: "English",
        htmlLang: "en-US",
        direction: "ltr",
      },
    },
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        googleTagManager: {
          containerId: "GTM-PZSTHGT4", // GTM
        },
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/resources",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: undefined,
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: "ALL",
          blogSidebarTitle: "最新文章",
          postsPerPage: 10,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: undefined,
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        // index hash
        hashed: true,
        // language
        language: ["en", "zh"],
        // highlight term
        highlightSearchTermsOnTargetPage: true,
        // docs route base path
        docsRouteBasePath: "/resources",
        blogRouteBasePath: "/blog",
      },
    ],
  ],
  themeConfig: {
    // Default social card. Pages get their own card from static/img/og when
    // one was generated (npm run og); see src/theme/SiteMetadata.
    image: isEn ? "/img/og/en/home.png" : "/img/og/zh-Hant/home.png",
    // colorMode: {
    //   respectPrefersColorScheme: true,
    // },
    // algolia: {
    //   appId: "HHT6LFI2CT",
    //   apiKey: "ff0205c345c78cc43d0b19adf2c47826",
    //   indexName: "prod_NAME",
    //   contextualSearch: true,
    //   searchPagePath: "search",
    // },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "KD LABs",
      logo: {
        alt: "KD LABs",
        src: "img/icon-192.png",
        width: 32,
        height: 32,
      },
      items: [
        { to: "blog", label: "最新文章", position: "left" },
        { to: "/products", label: "產品介紹", position: "left" },
        { to: "/about", label: "關於我們", position: "left" },
        { href: "https://portaly.cc/kdchang.labs/support", label: "贊助我喝杯咖啡", position: "left" },

        // {`
        //   type: "docSidebar",
        //   sidebarId: "tutorialSidebar",
        //   position: "left",
        //   label: "職涯技能樹",
        // },
        // {
        //   href: "https://facebook.com/groups/kdchang.com",
        //   label: "技術個人成長社群",
        //   position: "left",
        // },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "網站",
          items: [
            { label: "產品介紹", to: "/products" },
            { label: "最新文章", to: "/blog" },
            { label: "關於我們", to: "/about" },
            { label: "贊助我喝杯咖啡", href: "https://portaly.cc/kdchang.labs/support" },
          ],
        },
        {
          title: "社群",
          items: [
            {
              label: "Facebook 社團",
              href: "https://facebook.com/groups/kdchang.labs",
            },
            {
              label: "Facebook 粉絲專頁",
              href: "https://www.facebook.com/kdchang.labs",
            },
            {
              label: "Instagram",
              href: "https://www.instagram.com/kdchang.labs",
            },
          ],
        },
        {
          title: "聯絡",
          items: [
            { label: "聯絡信箱", href: "mailto:kdchang.labs@gmail.com" },
            { label: "隱私權政策", to: "/privacy" },
          ],
        },
      ],
      // Same wording as the copyright line in the KD LABs games; the heart is
      // lucide's Heart icon inlined, since this string is rendered as HTML.
      copyright: `Copyright © ${new Date().getFullYear()} KD LABs. Built with <svg class="copyright-heart" role="img" aria-label="love" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg> by <a target="_blank" rel="noopener" href="https://www.kdchang.com/">KD Chang</a> in Taiwan.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
