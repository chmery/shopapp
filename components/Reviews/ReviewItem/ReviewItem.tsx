import { Rating } from "@mui/material";
import { HeartIcon, ThrashIcon } from "../../UI/Icons/Icons";
import styles from "./ReviewItem.module.css";

type Props = {
    reviewData: ReviewData;
};

const ReviewItem = ({ reviewData }: Props) => {
    return (
        <div className={styles["review-item"]}>
            <div className={styles["avatar-email"]}>
                <div className={styles.avatar}></div>
                <span className={styles.email}>{reviewData.userEmail}</span>
            </div>
            <div>
                <Rating name="review-rating-read-only" value={reviewData.ratingValue} readOnly />
                <div className={styles.remove}>
                    <ThrashIcon />
                </div>
            </div>
            <p>{reviewData.reviewText}</p>
            <div>
                <span className={styles.date}>{reviewData.reviewDate}</span>
                <div className={styles.like}>
                    <HeartIcon />
                    {reviewData.likeCount}
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
