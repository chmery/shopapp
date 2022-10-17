import { getProductsData } from "../../helpers/helpers";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice/cartSlice";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import useIsInFavourites from "../../hooks/useIsInFavourites";
import NoContentMessage from "../../components/UI/NoContentMessage/NoContentMessage";
import ProductPageItem from "../../components/Product/ProductPageItem/ProductPageItem";
import ProductReviews from "../../components/Reviews/ProductReviews";
import { addToFavourites, removeFromFavourites } from "./helpers";

type Props = {
    data: ProductData[];
};

const Product = ({ data }: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { id } = router.query;
    const { authorizedUserId } = useContext(AuthContext);

    const product = data.find((product) => product.id === Number(id));

    const { isInFavourites, setIsInFavourites, checkIfInFavourites } = useIsInFavourites();

    useEffect(() => {
        if (!product) return;
        checkIfInFavourites(product);
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

    const addToFavouritesHandler = async () => {
        const favouriteItem = {
            title: product.title,
            image: product.image,
            id: product.id,
            price: product.price,
        };

        if (isInFavourites) {
            setIsInFavourites(false);
            removeFromFavourites(favouriteItem, authorizedUserId);
        } else {
            setIsInFavourites(true);
            addToFavourites(favouriteItem, authorizedUserId);
        }
    };

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
    const data = await getProductsData();

    return {
        props: {
            data,
        },
    };
};

export default Product;
