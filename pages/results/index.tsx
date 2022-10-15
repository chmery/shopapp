import { useRouter } from "next/router";
import ProductsList from "../../components/Product/ProductsList/ProductsList";
import NoContentMessage from "../../components/UI/NoContentMessage/NoContentMessage";
import { getProductsData } from "../../helpers/helpers";

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

    if (!products.length) {
        return (
            <NoContentMessage
                title={"No Results"}
                message={"We couldn't find any products with that name."}
            />
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
    const data = await getProductsData();

    return {
        props: {
            data,
        },
    };
};

export default Results;
