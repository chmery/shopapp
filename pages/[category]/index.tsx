import { useRouter } from "next/router";
import ProductsList from "../../components/Product/ProductsList/ProductsList";
import { capitalize, getProductsData } from "../../helpers/helpers";
import { getProductsByCategory } from "../../helpers/helpers";

type Props = {
    data: ProductData[];
};

const Category = ({ data }: Props) => {
    const router = useRouter();
    const { category } = router.query;

    if (!category || typeof category !== "string") return;

    const products = getProductsByCategory(data, category, 4);
    const categoryCapitalized = capitalize(category);

    return <ProductsList products={products} title={categoryCapitalized} />;
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
    const data = await getProductsData();

    return {
        props: {
            data,
        },
    };
};

export default Category;
