import { useEffect, useState } from "react";
import styles from './scroll.module.css';

interface Product {
  id: number;
  title: string;
}

interface ScrollIndicatorProps {
  url: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ url }) => {
  const [list, setList] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const handleScrollPercentage = (): void => {
    const scrolled: number = document.documentElement.scrollTop || document.body.scrollTop;
    const height: number = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercentage: number = (scrolled * 100) / height;
    setScrollPercentage(scrolledPercentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", handleScrollPercentage);
    };
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data?.products) {
        setList(data.products);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div className={styles.container}>
      <div className={styles.scrollProgressContainer}>
        <div className={styles.currentProgress} style={{ width: `${scrollPercentage}%` }}></div>
      </div>

      <div className={styles.listContainer}>
        <h1 className={styles.title}>Product List</h1>
        {loading ? (
          <div>Fetching data...</div>
        ) : list.length > 0 ? (
          list.map((product) => <p key={product.id}>{product.title}</p>)
        ) : (
          <div>No List Found</div>
        )}
      </div>
    </div>
  );
};

export default ScrollIndicator;
