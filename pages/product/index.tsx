import styles from "./ProductPage.module.css";
import Image from "next/future/image";
import { HeartIcon } from "../../components/UI/Icons/Icons";
import { getProductsData } from "../../helpers/helpers";
import { useRouter } from "next/router";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice/cartSlice";
import { db } from "../../firebase/config";
import { updateDoc, doc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { favouritesActions } from "../../store/favouritesSlice/favouritesSlice";
import { RootState } from "../../store/store";

type Props = {
    data: ProductData[];
};

const Product = ({ data }: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { id } = router.query;
    const { userId } = useContext(AuthContext) as AuthContext;

    const favouriteItems = useSelector((state: RootState) => state.favourites.favouriteItems);

    const productIndex = data.findIndex((product) => product.id === Number(id));
    const product = data[productIndex];

    // Temporary
    if (!product) return;

    const addToCartHandler = () => dispatch(cartActions.addToCart(product));

    const isInFavourites = () => {
        const addedItem = favouriteItems.find((item) => item.id === product.id);
        return addedItem ? true : false;
    };

    const addToFavouritesHandler = async () => {
        const favouriteItem = {
            title: product.title,
            image: product.image,
            id: product.id,
            price: product.price,
        };

        if (isInFavourites()) {
            await updateDoc(doc(db, "favourites", `${userId}`), {
                favouriteItems: arrayRemove(favouriteItem),
            });
            dispatch(favouritesActions.removeFromFavourites(favouriteItem));
        } else {
            await updateDoc(doc(db, "favourites", `${userId}`), {
                favouriteItems: arrayUnion(favouriteItem),
            });
            dispatch(favouritesActions.addToFavourites(favouriteItem));
        }
    };

    return (
        <div className={styles.product}>
            <div className={styles["product-image"]}>
                <Image src={product.image} alt={product.title} fill />
            </div>
            <div className={styles.description}>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <div className={styles.rating}>
                    <Rating
                        name="product-rating"
                        value={product.rating.rate}
                        precision={0.5}
                        readOnly
                    />
                    <span className={styles["rating-score"]}>{product.rating.rate}/5.0</span>
                    <span className={styles["rating-count"]}>{product.rating.count} votes</span>
                </div>
                <span className={styles.price}>${product.price}</span>
                <div className={styles.buttons}>
                    <button className={styles["cart-btn"]} onClick={addToCartHandler}>
                        Add to Cart
                    </button>
                    <button className={styles["fav-btn"]} onClick={addToFavouritesHandler}>
                        Favourites <HeartIcon />
                    </button>
                </div>
            </div>
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

export default Product;
