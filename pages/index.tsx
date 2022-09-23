import { getProductsData } from "../helpers/helpers";
import CategoryShowcase from "../components/Products/CategoryShowcase/CategoryShowcase";

type Props = {
    data: ProductData[];
};

const Home = ({ data }: Props) => {
    const categories = ["bestsellers"];

    data.forEach((product) => {
        if (!categories.includes(product.category)) categories.push(product.category);
    });

    return (
        <div>
            {categories.map((category) => (
                <CategoryShowcase products={data} category={category} />
            ))}
        </div>
    );
};

export const getStaticProps = async () => {
    const data = await getProductsData();

    return {
        props: {
            data,
        },
    };
};

export default Home;
