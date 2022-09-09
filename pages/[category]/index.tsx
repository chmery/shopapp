import { useRouter } from "next/router";
import ProductItem from "../../components/ProductItem/ProductItem";
import styles from "./Category.module.css";

type Props = {
    data: ProductData[];
};

const getProductsByCategory = (data: ProductData[], category: string | string[]) => {
    if (category === "bestsellers") return data.slice(0, 4);
    const products = data.filter((product) => product.category === category);
    return products;
};

const Category = ({ data }: Props) => {
    const router = useRouter();
    const { category } = router.query;

    if (!category) return;
    const products = getProductsByCategory(data, category);

    return (
        <>
            <h3>{category}</h3>
            <div className={styles.products}>
                {products.map((product) => {
                    return <ProductItem productData={product} />;
                })}
            </div>
        </>
    );
};

export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { category: "bestsellers" } },
            { params: { category: "electronics" } },
            { params: { category: "jewelery" } },
            { params: { category: "men's clothing" } },
            { params: { category: "women's clothing" } },
        ],
        fallback: false,
    };
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

export default Category;
