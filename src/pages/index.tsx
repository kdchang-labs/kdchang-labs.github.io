import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate, { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { ArrowRight } from "lucide-react";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { localizedProducts, productsIn } from "@site/src/data/products";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const facts = [
    {
      value: String(localizedProducts(locale).length),
      label: translate({
        id: "home.facts.products",
        message: "上線與開發中的產品",
        description: "Label under the total number of products",
      }),
    },
    {
      value: String(productsIn("game", locale).length),
      label: translate({
        id: "home.facts.games",
        message: "款經營策略遊戲",
        description: "Label under the number of games",
      }),
    },
    {
      value: locale === "en" ? "iOS · Android · Chrome · Web" : "iOS・Android・Chrome・Web",
      label: translate({
        id: "home.facts.platforms",
        message: "支援平台",
        description: "Label under the list of supported platforms",
      }),
    },
  ];
  return (
    <header className={styles.hero}>
      <div className="container">
        <p className={styles.eyebrow}>
          <Translate id="home.hero.eyebrow">KD LABs・獨立產品工作室</Translate>
        </p>
        <Heading as="h1" className={styles.title}>
          <Translate id="home.hero.title.line1">從一個具體的問題開始，</Translate>
          <br className={styles.titleBreak} />
          <Translate id="home.hero.title.line2">做出每天用得上的產品。</Translate>
        </Heading>
        <p className={styles.lead}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/products">
            <Translate id="home.hero.cta.products">查看產品</Translate>
          </Link>
          <Link className="button button--secondary button--lg" to="/blog">
            <Translate id="home.hero.cta.blog">最新文章</Translate>
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
                <Translate id="home.about.title">關於 KD LABs</Translate>
              </Heading>
              <div>
                <p className={styles.aboutText}>
                  <Translate
                    id="home.about.text"
                    values={{
                      founder: <Link href="https://www.kdchang.com/">KD Chang</Link>,
                    }}
                  >
                    {
                      "KD LABs 是由 {founder} 創辦的獨立產品工作室。我們專注用技術解決使用者在工作與生活上的問題，並根據他們的回饋不斷改進。"
                    }
                  </Translate>
                </p>
                <Link to="/about" className={styles.textLink}>
                  <Translate id="home.about.link">認識我們</Translate>
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
