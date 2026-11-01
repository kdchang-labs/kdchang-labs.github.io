import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { translate } from "@docusaurus/Translate";
import { ArrowUpRight, Clock, Globe, Puzzle, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  platformLabelsFor,
  type LocalizedProduct,
  type Platform,
} from "@site/src/data/products";
import styles from "./styles.module.css";

const platformIcons: Record<Platform, LucideIcon> = {
  web: Globe,
  chrome: Puzzle,
  ios: Smartphone,
  android: Smartphone,
};

export function PlatformList({
  product,
  compact = false,
}: {
  product: LocalizedProduct;
  /** Plain text instead of chips, for dense lists. */
  compact?: boolean;
}): ReactNode {
  const { i18n } = useDocusaurusContext();
  const isEn = i18n.currentLocale === "en";
  const platformLabels = platformLabelsFor(i18n.currentLocale);
  const listSeparator = isEn ? ", " : "、";
  const dot = isEn ? " · " : "・";
  const released = product.platforms.filter((p) => !p.upcoming);
  const upcoming = product.platforms.filter((p) => p.upcoming);
  const upcomingNote =
    upcoming.length > 0 &&
    translate(
      {
        id: "product.platforms.upcoming",
        message: "{platforms} 即將推出",
        description: "Platforms of a product that are not released yet",
      },
      {
        platforms: upcoming
          .map((p) => platformLabels[p.platform])
          .join(listSeparator),
      },
    );

  if (compact) {
    return (
      <p className={styles.compact}>
        {released.map((p) => platformLabels[p.platform]).join(dot)}
        {upcomingNote && (
          <span className={styles.compactUpcoming}>
            {released.length > 0 ? dot : ""}
            {upcomingNote}
          </span>
        )}
      </p>
    );
  }

  return (
    <div className={styles.platformBlock}>
      {released.length > 0 && (
        <ul
          className={styles.platforms}
          aria-label={translate({
            id: "product.platforms.label",
            message: "支援平台",
            description: "Accessible label of a product's platform list",
          })}
        >
          {released.map(({ platform }) => {
            const Icon = platformIcons[platform];
            return (
              <li key={platform} className={styles.platform}>
                <Icon size={14} strokeWidth={1.75} aria-hidden />
                {platformLabels[platform]}
              </li>
            );
          })}
        </ul>
      )}
      {upcomingNote && (
        <p className={styles.upcomingNote}>
          <Clock size={14} strokeWidth={1.75} aria-hidden />
          {upcomingNote}
        </p>
      )}
    </div>
  );
}

export default function ProductCard({
  product,
}: {
  product: LocalizedProduct;
}): ReactNode {
  const released = product.platforms.some((p) => !p.upcoming);
  return (
    <article className={styles.card}>
      <Link
        to={product.url}
        className={styles.imageLink}
        tabIndex={-1}
        aria-hidden
      >
        <img
          src={product.image}
          alt=""
          className={styles.image}
          loading="lazy"
        />
      </Link>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.summary}>{product.summary}</p>
        <p className={styles.description}>{product.description}</p>
        <PlatformList product={product} />
        <Link to={product.url} className={styles.cta}>
          {released
            ? translate({
                id: "product.cta.visit",
                message: "前往網站",
                description: "Link to a released product's site",
              })
            : translate({
                id: "product.cta.learnMore",
                message: "了解產品",
                description: "Link to an upcoming product's site",
              })}
          <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
