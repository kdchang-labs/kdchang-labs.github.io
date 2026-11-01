import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import { ArrowUpRight, Clock, Globe, Puzzle, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  platformLabels,
  type Platform,
  type Product,
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
  product: Product;
  /** Plain text instead of chips, for dense lists. */
  compact?: boolean;
}): ReactNode {
  const released = product.platforms.filter((p) => !p.upcoming);
  const upcoming = product.platforms.filter((p) => p.upcoming);
  const upcomingNote =
    upcoming.length > 0 &&
    `${upcoming.map((p) => platformLabels[p.platform]).join("、")} 即將推出`;

  if (compact) {
    return (
      <p className={styles.compact}>
        {released.map((p) => platformLabels[p.platform]).join("・")}
        {upcomingNote && (
          <span className={styles.compactUpcoming}>
            {released.length > 0 ? "・" : ""}
            {upcomingNote}
          </span>
        )}
      </p>
    );
  }

  return (
    <div className={styles.platformBlock}>
      {released.length > 0 && (
        <ul className={styles.platforms} aria-label="支援平台">
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
  product: Product;
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
          {released ? "前往網站" : "了解產品"}
          <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
