import { useRouter } from "next/router";

type ProductData = {
    title: string;
    category: string;
    price: number;
    description: string;
    image: string;
};

type Props = {
    data: ProductData[];
};

const getProductsByCategory = (data: ProductData[], category: string | string[]) => {
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
            <h1>Category Page for {category}</h1>
            {products.map((product) => {
                return <p>{product.title}</p>;
            })}
        </>
    );
};

export const getStaticPaths = async () => {
    return {
        paths: [
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
