/**
 * Wraps the classic theme's site-wide metadata with a per-page social card
 * from static/img/og, when one was generated.
 *
 * It renders after the original, so the card overrides themeConfig.image,
 * while a page's own `image` front matter (rendered deeper) still wins.
 */
import type { ReactNode } from "react";
import SiteMetadata from "@theme-original/SiteMetadata";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PageMetadata } from "@docusaurus/theme-common";
import { ogImageFor } from "@site/src/lib/ogImage";

export default function SiteMetadataWrapper(): ReactNode {
  const { siteConfig, i18n } = useDocusaurusContext();
  const { pathname } = useLocation();
  // siteConfig.baseUrl is the locale's base ("/" or "/en/"); the localized
  // home page has no trailing slash ("/en"), so match that too.
  const base = siteConfig.baseUrl.replace(/\/$/, "");
  const path =
    pathname === base
      ? "/"
      : pathname.startsWith(siteConfig.baseUrl)
        ? `/${pathname.slice(siteConfig.baseUrl.length)}`
        : pathname;

  return (
    <>
      <SiteMetadata />
      <PageMetadata image={ogImageFor(i18n.currentLocale, path)} />
    </>
  );
}
