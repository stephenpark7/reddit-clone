import { useEffect, useState } from "react";
import { getCategories } from "../../utils/api";
import styles from "./categoryList.module.scss";

export const CategoryList = () => {
  const [ categories, setCategories ] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h3>Categories</h3>
      <div className={styles.categoryList}>
        {categories.map((category: any, idx: number) => (
          <div key={idx}>
            <a className={styles.categoryItem} href={`/category/${category.name}`}>{category.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
};
