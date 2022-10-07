import { getProductsData } from "../../helpers/helpers";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice/cartSlice";
import { db, auth } from "../../firebase/config";
import { updateDoc, doc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { favouritesActions } from "../../store/favouritesSlice/favouritesSlice";
import useIsInFavourites from "../../hooks/useIsInFavourites";
import NoContentMessage from "../../components/UI/NoContentMessage/NoContentMessage";
import WriteReview from "../../components/Reviews/WriteReview/WriteReview";
import {
    getProductReviews,
    getPublishedReview,
    hasPublishedReview,
    likeReview,
    removeReview,
} from "../../helpers/product-page-helpers";
import ReviewsList from "../../components/Reviews/ReviewsList/ReviewsList";
import ReviewItem from "../../components/Reviews/ReviewItem/ReviewItem";
import ProductPageItem from "../../components/Product/ProductPageItem/ProductPageItem";

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
    const [publishedReview, setPublishedReview] = useState<ReviewData | null>(null);
    const [reviews, setReviews] = useState<ReviewData[]>([]);

    useEffect(() => {
        if (!product) return;
        checkIfInFavourites(product);

        const setProductReviews = async () => setReviews(await getProductReviews(product.id));
        setProductReviews();
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

        const reviewId = `${userId}${product.id}`;

        const review = {
            likedBy: [],
            reviewId,
            productId: product.id,
            userId: userId!,
            userEmail: auth.currentUser!.email!,
            ratingValue,
            reviewText,
            reviewDate,
            likeCount: 0,
        };

        await setDoc(doc(db, "reviews", reviewId), review);
        setReviews((prevState) => [...prevState, review]);
        setIsReviewPublished(true);
        setIsReviewSending(false);
    };

    const likeReviewHandler = async (reviewData: ReviewData) => {
        await likeReview(reviewData, userId);
        setReviews(await getProductReviews(product.id));
    };

    const removeReviewHandler = async () => {
        removeReview(publishedReview!);
        setPublishedReview(null);
        setIsReviewPublished(false);
        setReviews((prevState) => {
            const updatedReviews = prevState.filter(
                (review) => review.reviewId !== publishedReview!.reviewId
            );
            return updatedReviews;
        });
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
            {isLoggedIn && !isReviewPublished && (
                <WriteReview onPublish={publishReviewHandler} isReviewSending={isReviewSending} />
            )}
            {publishedReview && (
                <ReviewItem
                    reviewData={publishedReview}
                    onReviewRemove={removeReviewHandler}
                    userReview
                />
            )}
            {reviews.length > 0 && (
                <ReviewsList reviews={reviews} onReviewLike={likeReviewHandler} />
            )}
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
