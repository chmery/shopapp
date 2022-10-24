import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import PriceSummary from "../../components/Cart/PriceSummary/PriceSummary";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import Loader from "../../components/UI/Loader/Loader";
import useOrderData from "../../hooks/useOrderData";
import { AuthContext } from "../../store/auth-context";

const OrderDetailsPage = () => {
    const router = useRouter();

    const orderNumber = router.query["order-number"];
    const { authorizedUserId } = useContext(AuthContext);
    const { isLoading, orderData, getOrderData, noOrderData } = useOrderData();

    useEffect(() => {
        if (typeof orderNumber === "string" && authorizedUserId) {
            getOrderData(orderNumber, authorizedUserId);
        }
    }, [authorizedUserId]);

    if (noOrderData) router.push("/404");

    return (
        <>
            {isLoading && <Loader />}
            {orderData && <OrderDetails orderData={orderData} />}
            {orderData && <PriceSummary totalPrice={orderData.totalPrice} />}
        </>
    );
};

export default OrderDetailsPage;
