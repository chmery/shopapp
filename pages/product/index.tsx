import styles from "./ProductPage.module.css";
import Image from "next/future/image";
import { HeartIcon } from "../../components/UI/Icons/Icons";
import { getProductsData } from "../../helpers/helpers";
import { useRouter } from "next/router";
import { Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice/cartSlice";
import { db, auth } from "../../firebase/config";
import { updateDoc, doc, addDoc, collection, arrayUnion, arrayRemove } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { favouritesActions } from "../../store/favouritesSlice/favouritesSlice";
import useIsInFavourites from "../../hooks/useIsInFavourites";
import NoContentMessage from "../../components/UI/NoContentMessage/NoContentMessage";
import WriteReview from "../../components/Reviews/WriteReview/WriteReview";
import ReviewsItem from "../../components/Reviews/ReviewItem/ReviewItem";
import { getProductsReviews } from "./helpers";
import ReviewsList from "../../components/Reviews/ReviewsList/ReviewsList";

type Props = {
    data: ProductData[];
};

const TEST_DATA = {
    productId: 3,
    ratingValue: 4,
    reviewDate: "13 September, 2022",
    reviewText:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    userEmail: "test@test.com",
    userId: "4DFJIEHDSAG",
    likeCount: 44,
};

const Product = ({ data }: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { id } = router.query;
    const { userId, isLoggedIn } = useContext(AuthContext) as AuthContext;

    const productIndex = data.findIndex((product) => product.id === Number(id));
    const product = data[productIndex];

    const { isInFavourites, setIsInFavourites, checkIfInFavourites } = useIsInFavourites();

    const [isReviewPublished, setIsReviewPublished] = useState(false);
    const [isReviewSending, setIsReviewSending] = useState(false);
    const [reviews, setReviews] = useState<ReviewData[]>();

    useEffect(() => {
        checkIfInFavourites(product);
        const setProductsReviews = async () => {
            const productsReviews = await getProductsReviews(product.id);
            setReviews(productsReviews);
        };

        setProductsReviews();
    }, []);

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

    const reviewPublishHandler = async (ratingValue: number, reviewText: string) => {
        setIsReviewSending(true);
        const reviewDate = new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        await addDoc(collection(db, "reviews"), {
            productId: product.id,
            userId,
            userEmail: auth.currentUser!.email,
            ratingValue,
            reviewText,
            reviewDate,
            likeCount: 0,
        });
        setIsReviewPublished(true);
        setIsReviewSending(false);
    };

    return (
        <>
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
                        <button className="main-btn" onClick={addToCartHandler}>
                            Add to Cart
                        </button>
                        {isLoggedIn && (
                            <button
                                className={`${styles["fav-btn"]} ${
                                    isInFavourites ? styles["fav-btn-added"] : ""
                                }`}
                                onClick={addToFavouritesHandler}
                            >
                                Favourites
                                <HeartIcon />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {isLoggedIn && !isReviewPublished && (
                <WriteReview onPublish={reviewPublishHandler} isReviewSending={isReviewSending} />
            )}
            {reviews && <ReviewsList reviews={reviews} />}
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
