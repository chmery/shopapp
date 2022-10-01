import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export const getProductsReviews = async (productId: number) => {
    const productsReviews: ReviewData[] = [];

    const q = query(collection(db, "reviews"), where("productId", "==", productId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => productsReviews.push(doc.data() as ReviewData));
    return productsReviews;
};

export const hasPublishedReview = (reviews: ReviewData[], userId: string) =>
    reviews.some((review) => review.userId === userId);

export const getPublishedReview = (reviews: ReviewData[], userId: string) => {
    const publishedReview = reviews.find((review) => review.userId === userId);
    return publishedReview;
};
