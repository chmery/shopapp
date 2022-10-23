import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const useOrderData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [orderData, setOrderData] = useState<OrderData>();

    const noOrderData = !isLoading && !orderData;

    const getOrderData = async (orderNumber: string, authorizedUserId: string) => {
        const querySnapshot = await getDocs(
            query(
                collection(db, "orders"),
                where("orderId", "==", orderNumber),
                where("userId", "==", authorizedUserId)
            )
        );

        querySnapshot.forEach((doc) => {
            const orderData = doc.data();
            setOrderData(orderData as OrderData);
        });
        setIsLoading(false);
    };

    return {
        isLoading,
        noOrderData,
        orderData,
        getOrderData,
    };
};

export default useOrderData;
