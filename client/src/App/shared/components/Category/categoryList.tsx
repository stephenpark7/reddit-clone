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
      <div className={styles.categoryList}>
        {categories.map((category: any, idx: number) => (
          <a href={`/category/${category.name}`} key={idx}>
            <div className={styles.categoryItem} key={idx}>
              {category.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
