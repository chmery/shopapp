import { getProductsData } from "../helpers/general";
import CategoryShowcase from "../components/Product/CategoryShowcase/CategoryShowcase";

type Props = {
    products: ProductData[];
};

const Homepage = ({ products }: Props) => {
    const categories = ["bestsellers"];

    products.forEach((product) => {
        if (!categories.includes(product.category)) categories.push(product.category);
    });

    return (
        <div>
            {categories.map((category) => (
                <CategoryShowcase products={products} category={category} key={category} />
            ))}
        </div>
    );
};

export const getStaticProps = async () => {
    const products = await getProductsData();

    return {
        props: {
            products,
        },
    };
};

export default Homepage;
