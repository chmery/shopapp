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

    useEffect(() => {
        if (orderNumber) {
            const fetchOrder = async () => {
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
            fetchOrder();
        }
    }, [authorizedUserId]);

    if (!orderData && !isLoading) router.push("/404");
    if (!orderData) return <Loader />;

    return (
        <>
            <OrderDetails orderData={orderData} />
            <PriceSummary totalPrice={orderData.totalPrice} />
        </>
    );
};

export default OrderDetailsPage;
