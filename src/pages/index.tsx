import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { ArrowRight } from "lucide-react";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { products, productsIn } from "@site/src/data/products";

import styles from "./index.module.css";

const facts = [
  { value: String(products.length), label: "上線與開發中的產品" },
  { value: String(productsIn("game").length), label: "款經營策略遊戲" },
  { value: "iOS・Android・Chrome・Web", label: "支援平台" },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className="container">
        <p className={styles.eyebrow}>KD LABs・獨立產品工作室</p>
        <Heading as="h1" className={styles.title}>
          從一個具體的問題開始，
          <br className={styles.titleBreak} />
          做出每天用得上的產品。
        </Heading>
        <p className={styles.lead}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/products">
            查看產品
          </Link>
          <Link className="button button--secondary button--lg" to="/blog">
            最新文章
          </Link>
        </div>
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.about}>
          <div className="container">
            <div className={styles.aboutInner}>
              <Heading as="h2" className={styles.aboutTitle}>
                關於 KD LABs
              </Heading>
              <div>
                <p className={styles.aboutText}>
                  KD LABs 是由 KD Chang
                  創辦的獨立產品工作室。我們專注用技術解決使用者在工作與生活上的問題，並根據他們的回饋不斷改進。
                </p>
                <Link to="/about" className={styles.textLink}>
                  認識我們
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
