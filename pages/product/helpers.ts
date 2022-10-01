import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export const getProductsReviews = async (productId: number) => {
    const productsReviews: ReviewData[] = [];

    const q = query(collection(db, "reviews"), where("productId", "==", productId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => productsReviews.push(doc.data() as ReviewData));
    return productsReviews;
};
