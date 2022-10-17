import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PriceSummary from "../../components/Cart/PriceSummary/PriceSummary";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import Loader from "../../components/UI/Loader/Loader";
import { AuthContext } from "../../store/auth-context";

const OrderDetailsPage = () => {
    const router = useRouter();
    const { authorizedUserId } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [orderData, setOrderData] = useState<OrderData>();

    const orderNumber = router.query["order-number"];
    const SHIPPING_COST = 10;

    useEffect(() => {
        const storedUserId = localStorage.getItem("uid");
        if (!storedUserId) router.push("/auth/login");

        if (orderNumber && storedUserId) {
            const fetchOrder = async () => {
                const q = query(
                    collection(db, "orders"),
                    where("orderId", "==", orderNumber),
                    where("userId", "==", authorizedUserId)
                );
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    const orderData = doc.data();
                    setOrderData(orderData as OrderData);
                });
                setIsLoading(false);
            };
            fetchOrder();
        }
    }, [authorizedUserId]);

    if (!orderData && !isLoading) router.push("/404");
    if (!orderData) return <Loader />;

    return (
        <>
            <OrderDetails orderData={orderData!} />
            <PriceSummary subTotal={orderData!.totalPrice - SHIPPING_COST} />
        </>
    );
};

export default OrderDetailsPage;
