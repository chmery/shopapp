import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import ReviewItem from "./ReviewItem/ReviewItem";
import ReviewsList from "./ReviewsList/ReviewsList";
import WriteReview from "./WriteReview/WriteReview";
import { db, auth } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import {
    getProductReviews,
    getPublishedReview,
    hasPublishedReview,
    likeReview,
    removeReview,
} from "./helpers";

type Props = {
    product: ProductData;
};

const ProductReviews = ({ product }: Props) => {
    const [reviews, setReviews] = useState<ReviewData[]>([]);
    const [isReviewSending, setIsReviewSending] = useState(false);
    const [isReviewPublished, setIsReviewPublished] = useState(false);
    const [publishedReview, setPublishedReview] = useState<ReviewData | null>(null);

    const { userId, isLoggedIn } = useContext(AuthContext) as AuthContext;
    const canPublishReview = isLoggedIn && !isReviewPublished ? true : false;

    useEffect(() => {
        if (!product) return;
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
            {canPublishReview && (
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

export default ProductReviews;
