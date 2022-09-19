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
    logIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
    userId: string | null;
    isLoggedIn: boolean;
}

interface OrderData {
    orderDate: string;
    totalPrice: number;
    userId: string;
    orderedItems: {
        quantity: number;
        title: string;
        category: string;
        image: string;
    }[];
}
