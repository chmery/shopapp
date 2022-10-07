import { useRouter } from "next/router";
import ProductsList from "../../components/Product/ProductsList/ProductsList";
import { capitalize } from "../../helpers/helpers";
import { getProductsByCategory } from "../../helpers/helpers";

type Props = {
    data: ProductData[];
};

const Category = ({ data }: Props) => {
    const router = useRouter();
    const { category } = router.query;

    if (!category) return;
    const products = getProductsByCategory(data, category as string, 4);
    const categoryCapitalized = capitalize(category as string);

    return (
        <>
            <h3>{categoryCapitalized}</h3>
            <ProductsList products={products} />
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
