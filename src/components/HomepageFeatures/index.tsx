import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Png?: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Web 前後端技術",
    Png: require("@site/static/img/web-tech-icon.png").default,
    description: (
      <>
        從 React、Vue 到 Node.js、Python
        的全端和行動開發實戰。分享系統架構設計、API
        開發、資料庫優化與雲端部署等實務技術選型經驗
      </>
    ),
  },
  {
    title: "Data 資料分析/AI 工具",
    Png: require("@site/static/img/data-ai-icon.png").default,
    description: (
      <>
        分享整合 GitHub Copilot 和 Claude Code 等 AI 工具以及 Agentic
        Engineering 開發經驗以及 Python 資料分析與 AI 人工智慧/機器學習應用
      </>
    ),
  },
  {
    title: "軟體工程/專案管理/產品開發",
    Png: require("@site/static/img/agile-icon.png").default,
    description: (
      <>
        實戰分享敏捷開發、程式碼品質與團隊協作心得（Scrum、看板方法、Code Review
        等），提升工程師軟實力。同時分享獨立開發者的產品設計經驗
      </>
    ),
  },
];

function Feature({ title, Png, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={Png} className={styles.featurePng} role="img" />
      </div>
      <br />
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <br />
      </div>
    </section>
  );
}
