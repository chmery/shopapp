import {
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    increment,
    getDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
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

export const likeReview = async (review: ReviewData, userId: string | null) => {
    if (!userId) return;
    const isPublishedByUser = review.userId === userId;
    if (isPublishedByUser) return;

    const docRef = doc(db, "reviews", review.reviewId);
    const reviewData = (await getDoc(docRef)).data();
    const isAlreadyLiked = (reviewData as ReviewData).likedBy.some((id) => id === userId);

    await updateDoc(docRef, {
        likeCount: increment(isAlreadyLiked ? -1 : 1),
        likedBy: isAlreadyLiked ? arrayRemove(userId) : arrayUnion(userId),
    });
};
