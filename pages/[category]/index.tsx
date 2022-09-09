import { useRouter } from "next/router";
import ProductsList from "../../components/ProductsList/ProductsList";

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
