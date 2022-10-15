import { getProductsData } from "../../helpers/helpers";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice/cartSlice";
import { db } from "../../firebase/config";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import { favouritesActions } from "../../store/favouritesSlice/favouritesSlice";
import useIsInFavourites from "../../hooks/useIsInFavourites";
import NoContentMessage from "../../components/UI/NoContentMessage/NoContentMessage";
import ProductPageItem from "../../components/Product/ProductPageItem/ProductPageItem";
import ProductReviews from "../../components/Reviews/ProductReviews";

type Props = {
    data: ProductData[];
};

const Product = ({ data }: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { id } = router.query;
    const { userId, isLoggedIn } = useContext(AuthContext) as AuthContext;

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
            await updateDoc(doc(db, "favourites", `${userId}`), {
                favouriteItems: arrayRemove(favouriteItem),
            });
            dispatch(favouritesActions.removeFromFavourites(favouriteItem));
        } else {
            setIsInFavourites(true);
            await updateDoc(doc(db, "favourites", `${userId}`), {
                favouriteItems: arrayUnion(favouriteItem),
            });
            dispatch(favouritesActions.addToFavourites(favouriteItem));
        }
    };

    return (
        <>
            <ProductPageItem
                product={product}
                onAddToCart={addToCartHandler}
                onAddToFavourites={addToFavouritesHandler}
                isLoggedIn={isLoggedIn}
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
