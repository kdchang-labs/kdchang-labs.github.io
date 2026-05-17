import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import styles from "./products.module.css";

type Product = {
  title: string;
  description: string;
  image: string;
  link: string;
  status: "active" | "coming-soon" | "beta";
  tags: string[];
};

const products: Product[] = [
  {
    title: "人生推書店 - LifePicks Bookstore",
    description:
      "專為在人生路上感到徬徨、迷惘或卡關的你打造的虛擬獨立書店。無論你正探索自我、追求成長，這裡都有一本書在等著你。",
    image: "/img/projects/lifepicksbookstore.webp",
    link: "https://www.lifepicksbookstore.com/",
    status: "active",
    tags: ["選書電商", "閱讀"],
  },
  {
    image: "/img/projects/careertags.webp",
    title: "CareerTags 職涯書籤",
    description:
      "瀏覽器擴充功能，幫助使用者一鍵收藏跨平台職缺和學習資源，系統化管理求職進度及職涯成長。",
    tags: ["Chrome 擴充", "職涯發展"],
    status: "active",
    link: "https://www.careertags.com/",
  },
  {
    image: "/img/projects/certgym.webp",
    title: "CertGym 證照道館",
    description:
      "CertGym 是一個專為考取各類專業證照學習者設計的行動應用。透過閃卡、題庫、錯題收藏，讓備考變得有趣又高效。",
    tags: ["Education", "Certification", "Learning"],
    status: "coming-soon",
    link: "https://www.certgym.com/",
  },
];

const statusLabels = {
  active: "正式運營",
  beta: "公測中",
  "coming-soon": "即將推出",
};

function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImageWrapper}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productImage}
        />
        <span className={styles.productStatus} data-status={product.status}>
          {statusLabels[product.status]}
        </span>
      </div>
      <div className={styles.productContent}>
        <Heading as="h3" className={styles.productTitle}>
          {product.title}
        </Heading>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.productTags}>
          {product.tags.map((tag, idx) => (
            <span key={idx} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.productFooter}>
          {product.status === "coming-soon" ? (
            <button className={styles.btnDisabled} disabled>
              敬請期待
            </button>
          ) : (
            <Link to={product.link} className={styles.btnPrimary}>
              了解更多 →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Products(): ReactNode {
  return (
    <Layout
      title="產品介紹"
      description="KD LABs 致力於打造解決實際問題的優質產品"
    >
      <main className={styles.productsPage}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <Heading as="h1" className={styles.heroTitle}>
                產品介紹
              </Heading>
              <p className={styles.heroSubtitle}>
                致力於打造解決人們工作和生活問題的產品，讓這個世界更開放美好
              </p>
            </div>
          </div>
        </section>

        <section className={styles.productsSection}>
          <div className="container">
            <div className={styles.productsGrid}>
              {products.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaBox}>
              <Heading as="h2" className={styles.ctaTitle}>
                有想法？歡迎與我們聯絡
              </Heading>
              <p className={styles.ctaDescription}>
                如果您有產品合作或其他想法，歡迎與我們聯絡
              </p>
              <Link to="/about" className={styles.ctaButton}>
                聯繫我們
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
