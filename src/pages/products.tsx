import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import { Mail } from "lucide-react";
import ProductCard from "@site/src/components/ProductCard";
import { categories, productsIn } from "@site/src/data/products";
import styles from "./products.module.css";

export default function Products(): ReactNode {
  return (
    <Layout
      title="產品介紹"
      description="KD LABs 的產品、遊戲與工具：LifePicks 人生推書店、CareerTags 職涯書籤、CertGym 證照道館、物語系列經營策略遊戲與 HappyPrompt。"
    >
      <main>
        <header className={styles.header}>
          <div className="container">
            <p className={styles.eyebrow}>產品介紹</p>
            <Heading as="h1" className={styles.title}>
              我們做的東西
            </Heading>
            <p className={styles.lead}>
              App、瀏覽器擴充功能和網頁遊戲。每一個都從一個具體的問題開始做起，上線後持續更新。
            </p>
            <nav className={styles.jump} aria-label="產品分類">
              {categories.map((category) => (
                <a key={category.id} href={`#${category.id}`}>
                  {category.name}
                  <span>{productsIn(category.id).length}</span>
                </a>
              ))}
            </nav>
          </div>
        </header>

        {categories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className={styles.section}
          >
            <div className="container">
              <div className={styles.sectionHeader}>
                <Heading as="h2" className={styles.sectionTitle}>
                  {category.name}
                </Heading>
                <p className={styles.sectionDescription}>
                  {category.description}
                </p>
              </div>
              <div className={styles.grid}>
                {productsIn(category.id).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className={styles.contact}>
          <div className="container">
            <div className={styles.contactInner}>
              <div>
                <Heading as="h2" className={styles.contactTitle}>
                  合作與回饋
                </Heading>
                <p className={styles.contactText}>
                  產品合作、使用問題或功能建議，都歡迎來信。
                </p>
              </div>
              <Link
                to="mailto:kdchang.labs@gmail.com"
                className="button button--secondary"
              >
                <Mail size={16} strokeWidth={1.75} aria-hidden />
                <span className={styles.buttonLabel}>聯絡信箱</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
