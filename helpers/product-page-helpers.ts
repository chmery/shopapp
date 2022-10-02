import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export const getProductReviews = async (productId: number) => {
    const productReviews: ReviewData[] = [];

    const q = query(collection(db, "reviews"), where("productId", "==", productId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => productReviews.push(doc.data() as ReviewData));
    return productReviews;
};

export const hasPublishedReview = (reviews: ReviewData[], userId: string) =>
    reviews.some((review) => review.userId === userId);

export const getPublishedReview = (reviews: ReviewData[], userId: string) => {
    const publishedReview = reviews.find((review) => review.userId === userId);
    return publishedReview;
};

export const removeReview = async (review: ReviewData) =>
    await deleteDoc(doc(db, "reviews", review.reviewId));
