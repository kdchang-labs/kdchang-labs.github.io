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
  category: Category;
};

type Category = "product" | "game" | "tool";

const categories: { id: Category; title: string; subtitle: string }[] = [
  {
    id: "product",
    title: "產品",
    subtitle: "陪你閱讀、學習與成長的服務",
  },
  {
    id: "game",
    title: "遊戲",
    subtitle: "打開瀏覽器就能玩的 3D 經營策略遊戲「物語」系列",
  },
  {
    id: "tool",
    title: "工具",
    subtitle: "一鍵完成日常工作的瀏覽器擴充功能",
  },
];

const products: Product[] = [
  {
    title: "手搖飲物語 Tea Bar Story",
    description:
      "從夜市一台攤車開始，研發配方、招募店員、搶下每週的流行趨勢，撐過每個挑戰週，把小攤做成全球排隊的手搖飲帝國。",
    image: "/img/projects/teabarstory.jpg",
    link: "https://www.teabarstory.com",
    status: "active",
    tags: ["經營策略遊戲", "Roguelite", "3D"],
    category: "game",
  },
  {
    title: "獨角獸物語 Way to Unicorn",
    description:
      "從爸媽家的車庫開始，開發產品、組建團隊、說服投資人，在現金燒光之前把公司做到估值 10 億美元。",
    image: "/img/projects/waytounicorn.jpg",
    link: "https://www.waytounicorn.com",
    status: "active",
    tags: ["經營策略遊戲", "創業", "3D"],
    category: "game",
  },
  {
    title: "市政廳物語 90 Days to City Hall",
    description:
      "倒數 90 天就是市長選舉：從騎樓小店面起步，安排行程、組建競選團隊、構築競選流派，在開票夜贏得新港市。當選後還能挑戰四年任期。",
    image: "/img/projects/90daystocityhall.png",
    link: "https://www.90daystocityhall.com",
    status: "active",
    tags: ["經營策略遊戲", "Roguelite", "選舉"],
    category: "game",
  },
  {
    title: "王牌球探物語 Next Baseball Ace",
    description:
      "化身職棒球團的新球探，十六週跑遍全島球場，在能力值的迷霧裡發掘新秀，撐過球探會議，在選秀會上挑出下一位王牌。",
    image: "/img/projects/nextbaseballace.png",
    link: "https://www.nextbaseballace.com",
    status: "active",
    tags: ["經營策略遊戲", "Roguelite", "棒球"],
    category: "game",
  },
  {
    title: "LifePicks 人生推書店",
    description:
      "專為在人生路上感到徬徨、迷惘或卡關的你打造的虛擬獨立書店。無論你正探索自我、追求成長，這裡都有一本書在等著你。",
    image: "/img/projects/lifepicksbookstore.webp",
    link: "https://www.lifepicksbookstore.com/",
    status: "active",
    tags: ["選書電商", "閱讀"],
    category: "product",
  },
  {
    image: "/img/projects/careertags.webp",
    title: "CareerTags 職涯書籤",
    description:
      "瀏覽器擴充功能，幫助使用者一鍵收藏跨平台職缺和學習資源，系統化管理求職進度及職涯成長。",
    tags: ["Chrome 擴充", "職涯發展"],
    status: "active",
    link: "https://www.careertags.com/",
    category: "tool",
  },
  {
    image: "/img/projects/certgym.webp",
    title: "CertGym 證照道館",
    description:
      "CertGym 是一個專為考取各類專業證照學習者設計的行動應用。透過閃卡、題庫、錯題收藏，讓備考變得有趣又高效。",
    tags: ["Education", "Certification", "Learning"],
    status: "coming-soon",
    link: "https://www.certgym.com/",
    category: "product",
  },
  {
    image: "/img/projects/happyprompt.webp",
    title: "HappyPrompt 提示詞管理工具",
    description:
      "瀏覽器擴充功能，一鍵儲存與插入 AI Prompt 指令，支援 ChatGPT、Claude、Gemini，內建 50+ 跨職能專業提示詞庫。免登入，資料只存在本地。",
    tags: ["Chrome 擴充", "AI", "生產力"],
    status: "active",
    link: "https://www.happyprompt.net/",
    category: "tool",
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
            {categories.map((category) => (
              <div key={category.id} className={styles.categoryBlock}>
                <div className={styles.categoryHeader}>
                  <Heading as="h2" className={styles.categoryTitle}>
                    {category.title}
                  </Heading>
                  <p className={styles.categorySubtitle}>
                    {category.subtitle}
                  </p>
                </div>
                <div className={styles.productsGrid}>
                  {products
                    .filter((product) => product.category === category.id)
                    .map((product) => (
                      <ProductCard key={product.title} product={product} />
                    ))}
                </div>
              </div>
            ))}
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
