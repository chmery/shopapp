import { useRouter } from "next/router";
import ProductItem from "../../components/ProductItem/ProductItem";
import styles from "./Results.module.css";

type Props = {
    data: ProductData[];
};

const Results = ({ data }: Props) => {
    const router = useRouter();
    const { keyword } = router.query;

    const keywordFormatted = `${keyword}`.toLowerCase();

    const products = data.filter((product) =>
        product.title.toLowerCase().includes(keywordFormatted)
    );

    if (products.length === 0) {
        return (
            <div className={styles["no-results"]}>
                <h3>No results</h3>
                <p>We could not find any products with that name.</p>
            </div>
        );
    }

    return (
        <>
            <h3>Results for {keyword}</h3>
            <div className={styles.products}>
                {products.map((product) => (
                    <ProductItem productData={product} />
                ))}
            </div>
        </>
    );
};

export const getStaticProps = async () => {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const data = await res.json();

    return {
        props: {
            data,
        },
    };
};

export default Results;
