import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import { ArrowUpRight, Gamepad2, Package, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PlatformList } from "@site/src/components/ProductCard";
import {
  categories,
  productsIn,
  type Category,
} from "@site/src/data/products";
import styles from "./styles.module.css";

const categoryIcons: Record<Category, LucideIcon> = {
  product: Package,
  game: Gamepad2,
  tool: Wrench,
};

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <Heading as="h2" className={styles.title}>
            產品、遊戲與工具
          </Heading>
          <Link to="/products" className={styles.all}>
            完整產品介紹
          </Link>
        </div>
        <div className={styles.columns}>
          {categories.map((category) => {
            const Icon = categoryIcons[category.id];
            return (
              <div key={category.id} className={styles.column}>
                <div className={styles.columnHeader}>
                  <span className={styles.icon}>
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <Heading as="h3" className={styles.columnTitle}>
                    {category.name}
                  </Heading>
                </div>
                <p className={styles.columnDescription}>
                  {category.description}
                </p>
                <ul className={styles.list}>
                  {productsIn(category.id).map((product) => (
                    <li key={product.id}>
                      <Link to={product.url} className={styles.item}>
                        <span className={styles.itemName}>
                          {product.name}
                          <ArrowUpRight
                            size={14}
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </span>
                        <span className={styles.itemSummary}>
                          {product.summary}
                        </span>
                      </Link>
                      <PlatformList product={product} compact />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
