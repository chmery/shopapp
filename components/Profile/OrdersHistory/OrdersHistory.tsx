import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/auth-context";
import styles from "./OrdersHistory.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import OrderItem from "./OrderItem";
import Loader from "../../UI/Loader/Loader";

const getSortedOrders = (orders: OrderData[]) => {
    const getTimestamp = (orderId: string) => {
        return orderId.slice(0, -4);
    };

    const sortedOrders = orders.sort((a, b) => {
        const timestampA = Number(getTimestamp(a.orderId));
        const timestampB = Number(getTimestamp(b.orderId));

        return timestampB - timestampA;
    });

    return sortedOrders;
};

const OrdersHistory = () => {
    const { authorizedUserId } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<OrderData[]>();

    useEffect(() => {
        const fetchOrders = async () => {
            const q = query(collection(db, "orders"), where("userId", "==", authorizedUserId));
            const querySnapshot = await getDocs(q);

            const orders: OrderData[] = [];

            querySnapshot.forEach((doc) => {
                const orderData = doc.data();
                orders.push(orderData as OrderData);
            });

            if (orders.length) {
                const sortedOrders = getSortedOrders(orders);
                setOrders(sortedOrders);
            }

            setIsLoading(false);
        };
        fetchOrders();
    }, []);

    return (
        <>
            <div className={styles["orders-history"]}>
                <h3>Orders history</h3>
                {isLoading && <Loader />}
                {!orders && !isLoading && <p>You haven't placed any orders yet.</p>}
            </div>
            {orders && orders.map((order) => <OrderItem orderData={order} key={order.orderId} />)}
        </>
    );
};

export default OrdersHistory;
