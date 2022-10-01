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
import {
    getProductsReviews,
    getPublishedReview,
    hasPublishedReview,
    removeReview,
} from "../../helpers/product-page-helpers";
import ReviewsList from "../../components/Reviews/ReviewsList/ReviewsList";
import ReviewItem from "../../components/Reviews/ReviewItem/ReviewItem";

type Props = {
    data: ProductData[];
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
    const [areReviewsLoading, setAreReviewsLoading] = useState(true);
    const [publishedReview, setPublishedReview] = useState<ReviewData | null>(null);
    const [reviews, setReviews] = useState<ReviewData[]>([]);

    useEffect(() => {
        if (!product) return;
        checkIfInFavourites(product);

        const setProductsReviews = async () => {
            const productsReviews = await getProductsReviews(product.id);
            setReviews(productsReviews);
            setAreReviewsLoading(false);
        };

        setProductsReviews();
    }, [product]);

    useEffect(() => {
        if (!reviews || !userId) return;
        if (hasPublishedReview(reviews, userId)) {
            setIsReviewPublished(true);
            const publishedReview = getPublishedReview(reviews, userId);
            setPublishedReview(publishedReview!);
        }
    }, [reviews, userId]);

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

    const publishReviewHandler = async (ratingValue: number, reviewText: string) => {
        setIsReviewSending(true);
        const reviewDate = new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const review = {
            productId: product.id,
            userId: userId!,
            userEmail: auth.currentUser!.email!,
            ratingValue,
            reviewText,
            reviewDate,
            likeCount: 0,
        };

        await addDoc(collection(db, "reviews"), review);
        setReviews((prevState) => [...prevState, review]);
        setIsReviewPublished(true);
        setIsReviewSending(false);
    };

    const removeReviewHandler = () => {
        removeReview(publishedReview!);
        setPublishedReview(null);
        setIsReviewPublished(false);
        setReviews((prevState) => {
            const updatedReviews = prevState.filter(
                (review) => review.userId !== publishedReview!.userId
            );
            return updatedReviews;
        });
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
            {isLoggedIn && !isReviewPublished && !areReviewsLoading && (
                <WriteReview onPublish={publishReviewHandler} isReviewSending={isReviewSending} />
            )}
            {publishedReview && (
                <ReviewItem
                    reviewData={publishedReview}
                    onReviewRemove={removeReviewHandler}
                    userReview
                />
            )}
            {reviews.length > 0 && !areReviewsLoading && <ReviewsList reviews={reviews} />}
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
