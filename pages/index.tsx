import { getProductsData } from "../helpers/helpers";
import CategoryShowcase from "../components/Product/CategoryShowcase/CategoryShowcase";

type Props = {
    data: ProductData[];
};

const Homepage = ({ data }: Props) => {
    const categories = ["bestsellers"];

    data.forEach((product) => {
        if (!categories.includes(product.category)) categories.push(product.category);
    });

    return (
        <div>
            {categories.map((category) => (
                <CategoryShowcase products={data} category={category} key={category} />
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

export default Homepage;
