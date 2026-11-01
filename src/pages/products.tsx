import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Mail } from "lucide-react";
import ProductCard from "@site/src/components/ProductCard";
import { localizedCategories, productsIn } from "@site/src/data/products";
import styles from "./products.module.css";

export default function Products(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const categories = localizedCategories(locale);
  return (
    <Layout
      title={translate({
        id: "products.meta.title",
        message: "產品介紹",
        description: "Title of the products page",
      })}
      description={translate({
        id: "products.meta.description",
        message:
          "KD LABs 的產品、遊戲與工具：LifePicks 人生推書店、CareerTags 職涯書籤、CertGym 證照道館、物語系列經營策略遊戲與 HappyPrompt。",
        description: "Meta description of the products page",
      })}
    >
      <main>
        <header className={styles.header}>
          <div className="container">
            <p className={styles.eyebrow}>
              <Translate id="products.header.eyebrow">產品介紹</Translate>
            </p>
            <Heading as="h1" className={styles.title}>
              <Translate id="products.header.title">我們做的東西</Translate>
            </Heading>
            <p className={styles.lead}>
              <Translate id="products.header.lead">
                App、瀏覽器擴充功能和網頁遊戲。每一個都從一個具體的問題開始做起，上線後持續更新。
              </Translate>
            </p>
            <nav
              className={styles.jump}
              aria-label={translate({
                id: "products.header.categoriesLabel",
                message: "產品分類",
                description: "Accessible label of the category jump links",
              })}
            >
              {categories.map((category) => (
                <a key={category.id} href={`#${category.id}`}>
                  {category.name}
                  <span>{productsIn(category.id, locale).length}</span>
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
                {productsIn(category.id, locale).map((product) => (
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
                  <Translate id="products.contact.title">合作與回饋</Translate>
                </Heading>
                <p className={styles.contactText}>
                  <Translate id="products.contact.text">
                    產品合作、使用問題或功能建議，都歡迎來信。
                  </Translate>
                </p>
              </div>
              <Link
                to="mailto:kdchang.labs@gmail.com"
                className="button button--secondary"
              >
                <Mail size={16} strokeWidth={1.75} aria-hidden />
                <span className={styles.buttonLabel}>
                  <Translate id="products.contact.email">聯絡信箱</Translate>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
