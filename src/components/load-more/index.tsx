import { useEffect, useState } from "react";
import './styles.css';

interface Product {
    id: number;
    title: string;
    thumbnail: string;
}

interface LoadMoreProps {
    url: string;
    limit: number;
}

const LoadMore = ({ url, limit }: LoadMoreProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [skip, setSkip] = useState<number>(0);

    const fetchData = async () => {
        setLoading(true);
        try {
            const resp = await fetch(`${url}?limit=${limit}&skip=${skip}&select=title,thumbnail`);
            const data = await resp.json();
            if (data && data.products && data.products.length) {
                setProducts(prevProd => [...prevProd, ...data.products]);
            }
            console.log(data.products);

        } catch (error: any) {
            setErr(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (url) {
            fetchData();
        }
    }
        , [url, skip])

    return (
        <div className="load-more-container">
            <div className="products-wrapper">
                {
                    loading ? <div> Loading </div>
                        : err ? <div> {err} </div>
                            : products.length > 0 ? products.map((product: Product) => {
                                return <div className="product" key={product.id}>
                                    <img src={product.thumbnail} alt={product.title} />
                                    <p>{product.title}</p>
                                </div>
                            })
                                : <div> No Products found </div>
                }
            </div>
            <button onClick={() => setSkip(prev => (prev + limit))} disabled={loading}>
                {loading ? "loading...": "Load More"}
            </button>
        </div>
    );
}

export default LoadMore;