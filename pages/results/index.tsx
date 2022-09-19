import { useRouter } from "next/router";
import ProductsList from "../../components/Products/ProductsList/ProductsList";
import styles from "./Results.module.css";

type Props = {
    data: ProductData[];
};

const Results = ({ data }: Props) => {
    const router = useRouter();
    const { keyword } = router.query;

    if (!keyword) return;
    const products = data.filter((product) =>
        product.title.toLowerCase().includes(keyword.toString().toLowerCase())
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
            <h3>Results for: {keyword}</h3>
            <ProductsList products={products} />
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
