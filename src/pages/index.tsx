import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/blog">
              瀏覽最新消息
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/products"
            >
              探索產品清單
            </Link>
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5+</div>
              <div className={styles.statLabel}>產品數量</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10,000+</div>
              <div className={styles.statLabel}>累計使用者</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>五星好評</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description={`${siteConfig.tagline}`}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
