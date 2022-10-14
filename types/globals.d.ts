interface ProductData {
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface AuthContext {
    setIsLoggedIn: (boolean: boolean) => void;
    setUserId: (userId: string | null) => void;
    userId: string | null;
    isLoggedIn: boolean | null;
}

interface OrderData {
    orderId: string;
    orderDate: string;
    totalPrice: number;
    userId: string;
    orderedItems: {
        quantity: number;
        title: string;
        category: string;
        image: string;
        price: number;
    }[];
}

interface FavouriteItem {
    title: string;
    image: string;
    id: number;
    price: number;
}

interface ReviewData {
    likedBy: string[];
    reviewId: string;
    productId: number;
    ratingValue: number;
    reviewDate: string;
    reviewText: string;
    userEmail: string;
    userId: string;
    likeCount: number;
}
