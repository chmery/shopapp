import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import styles from "./OrdersHistory.module.css";
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../firebase/config";

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

    return (
        <>
            <h3>Orders history</h3>
            {orders &&
                orders.map((order: OrderData) => (
                    <p>
                        {order.orderDate} {order.totalPrice}
                    </p>
                ))}
        </>
    );
};

export default OrdersHistory;
