import ReviewItem from "../ReviewItem/ReviewItem";
import styles from "./ReviewsList.module.css";

type Props = {
    reviews: ReviewData[];
    onReviewLike: (review: ReviewData) => void;
};

const ReviewsList = ({ reviews, onReviewLike }: Props) => {
    const reviewLikeHandler = (review: ReviewData) => onReviewLike(review);

    return (
        <div className={styles["reviews-list"]}>
            <h3>Customers reviews</h3>
            {reviews.map((review) => (
                <ReviewItem
                    reviewData={review}
                    key={review.reviewId}
                    onReviewLike={reviewLikeHandler}
                />
            ))}
        </div>
    );
};

export default ReviewsList;
