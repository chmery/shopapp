import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PriceSummary from "../../components/Cart/PriceSummary/PriceSummary";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import Loader from "../../components/UI/Loader/Loader";
import { AuthContext } from "../../store/auth-context";

const OrderDetailsPage = () => {
    const { isLoggedIn } = useContext(AuthContext) as AuthContext;
    const router = useRouter();
    const orderNumber = router.query["order-number"];

    const [orderData, setOrderData] = useState<OrderData>();
    const SHIPPING_COST = 10;

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/auth?action=login");
            return;
        }

        const fetchOrder = async () => {
            const q = query(collection(db, "orders"), where("orderId", "==", orderNumber));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const orderData = doc.data();
                setOrderData(orderData as OrderData);
            });
        };
        fetchOrder();
    }, []);

    if (!orderData || !isLoggedIn) return <Loader />;

    return (
        <>
            <OrderDetails orderData={orderData} />
            <PriceSummary subTotal={orderData.totalPrice - SHIPPING_COST} />
        </>
    );
};

export default OrderDetailsPage;
