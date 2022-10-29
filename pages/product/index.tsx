import { getProductsData } from "../../helpers/general";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice/cartSlice";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import useFavourites from "../../hooks/useFavourites";
import NoContentMessage from "../../components/UI/NoContentMessage/NoContentMessage";
import ProductPageItem from "../../components/Product/ProductPageItem/ProductPageItem";
import ProductReviews from "../../components/Reviews/ProductReviews";

const Product = ({ products }: { products: ProductData[] }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { id } = router.query;
    const { authorizedUserId } = useContext(AuthContext);

    const product = products.find((product) => product.id === Number(id));

    const { isInFavourites, checkIfInFavourites, addToFavourites, removeFromFavourites } =
        useFavourites();

    useEffect(() => {
        if (product) checkIfInFavourites(product);
    }, [product]);

    if (!product) {
        return (
            <NoContentMessage
                title={"Such a product does not exist"}
                message={"We could not find any product at this address."}
            />
        );
    }

    const addToCartHandler = () => dispatch(cartActions.addToCart(product));

    const addToFavouritesHandler = () =>
        isInFavourites
            ? removeFromFavourites(product, authorizedUserId)
            : addToFavourites(product, authorizedUserId);

    return (
        <>
            <ProductPageItem
                product={product}
                onAddToCart={addToCartHandler}
                onAddToFavourites={addToFavouritesHandler}
                authorizedUserId={authorizedUserId}
                isInFavourites={isInFavourites}
            />
            <ProductReviews product={product} />
        </>
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

export default Product;
