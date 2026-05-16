import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Png?: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "生產力工具",
    icon: "🎯",
    Png: require("@site/static/img/web-tech-icon.png").default,
    description: (
      <>
        幫助人們更有效率地完成工作，節省時間，提升產出品質。打造直觀易用的工具，讓複雜的任務變得簡單，讓日常工作更加輕鬆。
      </>
    ),
  },
  {
    title: "個人成長社群平台",
    icon: "📚",
    Png: require("@site/static/img/data-ai-icon.png").default,
    description: (
      <>
        讓個人成長變得更簡單、更有趣，幫助人們持續成長。透過社群的力量，串連志同道合的夥伴，一起學習、分享、進步。
      </>
    ),
  },
  {
    title: "AI 應用",
    icon: "🤖",
    Png: require("@site/static/img/agile-icon.png").default,
    description: (
      <>
        運用人工智慧技術，解決過去難以解決的問題，創造新的可能性。讓 AI
        成為人們的得力助手，提升工作效率與生活品質。
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className={styles.featureCard}>
        <div className={styles.iconWrapper}>
          <span className={styles.iconEmoji}>{icon}</span>
        </div>
        <div className={styles.cardContent}>
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
        <div className={styles.cardFooter}>
          <a href="/products">
            <span className={styles.learnMore}>了解更多 →</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>我們的產品</span>
          <Heading as="h2" className={styles.sectionTitle}>
            打造解決問題的產品
          </Heading>
          <p className={styles.sectionSubtitle}>
            專注於開發能夠真正幫助人們的產品，讓工作和生活變得更美好
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
