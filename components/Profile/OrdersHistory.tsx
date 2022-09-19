import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import styles from "./OrdersHistory.module.css";
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../firebase/config";
import OrderItem from "./OrderItem";

const OrdersHistory = () => {
    const { userId } = useContext(AuthContext) as AuthContext;
    const [orders, setOrders] = useState<DocumentData>();

    useEffect(() => {
        const fetchOrders = async () => {
            const q = query(collection(db, "orders"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);

            const orders: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                const orderData = doc.data();
                orders.push(orderData);
            });

            setOrders(orders);
        };
        fetchOrders();
    }, []);

    const OrdersList = () => orders!.map((order: OrderData) => <OrderItem orderData={order} />);

    return (
        <>
            <h3 className={styles["orders-history"]}>Orders history</h3>
            {orders && <OrdersList />}
        </>
    );
};

export default OrdersHistory;
