import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import ReviewItem from "./ReviewItem/ReviewItem";
import ReviewsList from "./ReviewsList/ReviewsList";
import {
    getProductReviews,
    getPublishedReview,
    hasPublishedReview,
    likeReview,
    publishReview,
    removeReview,
} from "./helpers";
import PublishReview from "./PublishReview/PublishReview";

type Props = {
    product: ProductData;
};

const ProductReviews = ({ product }: Props) => {
    const [reviews, setReviews] = useState<ReviewData[]>([]);
    const [publishedReview, setPublishedReview] = useState<ReviewData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { authorizedUserId } = useContext(AuthContext);
    const canPublishReview = authorizedUserId && !publishedReview ? true : false;

    useEffect(() => {
        if (!product) return;
        const setProductReviews = async () => setReviews(await getProductReviews(product.id));
        setProductReviews();
    }, [product]);

    useEffect(() => {
        if (!reviews || !authorizedUserId) return;
        if (hasPublishedReview(reviews, authorizedUserId)) {
            const publishedReview = getPublishedReview(reviews, authorizedUserId);
            setPublishedReview(publishedReview!);
        }
    }, [reviews, authorizedUserId]);

    const publishReviewHandler = async (ratingValue: number, reviewText: string) => {
        setIsLoading(true);
        const publishedReview = await publishReview(product.id, ratingValue, reviewText);
        setReviews((prevState) => [...prevState, publishedReview]);
        setPublishedReview(publishedReview);
        setIsLoading(false);
    };

    const likeReviewHandler = async (reviewData: ReviewData) => {
        await likeReview(reviewData, authorizedUserId);
        setReviews(await getProductReviews(product.id));
    };

    const removeReviewHandler = async () => {
        if (!publishedReview) return;
        removeReview(publishedReview);
        setPublishedReview(null);
        setReviews((prevState) => {
            const updatedReviews = prevState.filter(
                (review) => review.reviewId !== publishedReview.reviewId
            );
            return updatedReviews;
        });
    };

    return (
        <>
            {canPublishReview && (
                <PublishReview onPublish={publishReviewHandler} isLoading={isLoading} />
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
