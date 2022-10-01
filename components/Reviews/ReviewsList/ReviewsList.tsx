import ReviewItem from "../ReviewItem/ReviewItem";
import styles from "./ReviewsList.module.css";

type Props = {
    reviews: ReviewData[];
};

const ReviewsList = ({ reviews }: Props) => {
    return (
        <div className={styles["reviews-list"]}>
            <h3>Customers reviews</h3>
            {reviews.map((review) => (
                <ReviewItem reviewData={review} key={review.userId} />
            ))}
        </div>
    );
};

export default ReviewsList;
