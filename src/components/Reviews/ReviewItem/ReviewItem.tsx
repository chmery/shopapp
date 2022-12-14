import { Rating } from "@mui/material";
import Icons from "../../UI/Icons/Icons";
import styles from "./ReviewItem.module.css";

type Props = {
    reviewData: ReviewData;
    userReview?: boolean;
    onReviewRemove?: () => void;
    onReviewLike?: (review: ReviewData) => void;
};

const ReviewItem = ({ reviewData, userReview, onReviewRemove, onReviewLike }: Props) => {
    const reviewLikeHandler = () => {
        onReviewLike!(reviewData);
    };

    return (
        <>
            {userReview && <h3 className={styles["your-review"]}>Your review</h3>}
            <div className={styles["review-item"]}>
                {!userReview && (
                    <div className={styles["avatar-email"]}>
                        <div className={styles.avatar}></div>
                        <span className={styles.email}>{reviewData.userEmail}</span>
                    </div>
                )}

                <div>
                    <Rating
                        name="review-rating-read-only"
                        value={reviewData.ratingValue}
                        readOnly
                    />
                    {userReview && (
                        <div className={styles.remove} onClick={onReviewRemove}>
                            <Icons.Thrash />
                        </div>
                    )}
                </div>
                <p>{reviewData.reviewText}</p>
                <div>
                    <span className={styles.date}>{reviewData.reviewDate}</span>
                    {!userReview && (
                        <div className={styles.like} onClick={reviewLikeHandler}>
                            <Icons.Heart />
                            {reviewData.likeCount}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ReviewItem;
