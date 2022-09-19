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
                console.log(orderData);
                orders.push(orderData);
            });

            if (orders.length) setOrders(orders);
        };
        fetchOrders();
    }, []);

    const OrdersList = () => orders!.map((order: OrderData) => <OrderItem orderData={order} />);

    return (
        <>
            <div className={styles["orders-history"]}>
                <h3>Orders history</h3>
                {!orders && <p>You haven't placed any orders yet.</p>}
            </div>
            {orders && <OrdersList />}
        </>
    );
};

export default OrdersHistory;
