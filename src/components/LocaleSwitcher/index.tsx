import { type ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";
import { ChevronDown } from "lucide-react";
import styles from "./styles.module.css";

/**
 * Language selector, rendered as the last column of the footer. Ported from
 * ai.kdchang.com.
 *
 * The URL of the same page in another locale is built by stripping every known
 * locale prefix off the current path and prepending the target locale's base
 * URL. The theme's own `useAlternatePageUtils` instead does
 * `pathname.replace(baseUrl, '')`, which is a no-op whenever the path does not
 * carry the locale base URL verbatim — e.g. `/en` rather than `/en/`, which is
 * what `trailingSlash: false` produces for a localized home page — and then
 * stacks the prefix onto itself: /en -> /en//en -> ...
 * See https://github.com/facebook/docusaurus/issues/9170
 *
 * The entries stay plain anchors: switching locale loads a different bundle,
 * so it needs a full page load rather than client-side navigation.
 */
export default function LocaleSwitcher(): ReactNode {
  const {
    siteConfig,
    i18n: { locales, currentLocale, defaultLocale, localeConfigs },
  } = useDocusaurusContext();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    function onPointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (locales.length < 2) {
    return null;
  }

  const rootBaseUrl = localeConfigs[defaultLocale]!.baseUrl;
  const localePrefixes = locales
    .map((locale) => localeConfigs[locale]!.baseUrl)
    .filter((baseUrl) => baseUrl !== rootBaseUrl)
    .map((baseUrl) => baseUrl.slice(rootBaseUrl.length));

  let suffix = pathname.startsWith(rootBaseUrl)
    ? pathname.slice(rootBaseUrl.length)
    : pathname.replace(/^\//, "");
  let stripped = true;
  while (stripped) {
    stripped = false;
    for (const prefix of localePrefixes) {
      if (suffix === prefix.replace(/\/$/, "")) {
        suffix = "";
        stripped = true;
      } else if (suffix.startsWith(prefix)) {
        suffix = suffix.slice(prefix.length);
        stripped = true;
      }
    }
  }

  const label = translate({
    id: "footer.language.label",
    message: "語言",
    description: "The accessible label of the footer language switcher",
  });

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        ref={buttonRef}
        className={styles.toggle}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
      >
        {localeConfigs[currentLocale]!.label}
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          aria-hidden
          className={clsx(styles.chevron, open && styles.chevronOpen)}
        />
      </button>

      {open && (
        <ul className={styles.menu}>
          {locales.map((locale) => {
            const localeConfig = localeConfigs[locale]!;
            const href = `${
              localeConfig.url === siteConfig.url ? "" : localeConfig.url
            }${localeConfig.baseUrl}${suffix}`;
            const isCurrent = locale === currentLocale;
            return (
              <li key={locale}>
                <a
                  href={href}
                  lang={localeConfig.htmlLang}
                  hrefLang={localeConfig.htmlLang}
                  aria-current={isCurrent ? "true" : undefined}
                  className={clsx(styles.item, isCurrent && styles.current)}
                >
                  {localeConfig.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
