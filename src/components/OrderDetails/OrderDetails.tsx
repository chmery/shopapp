import OrderItem from "./OrderItem/OrderItem";
import styles from "./OrderDetails.module.css";

type Props = {
    orderData: OrderData;
};

const OrderDetails = ({ orderData }: Props) => {
    return (
        <>
            <div className={styles.message}>
                <h3>Order Details</h3>
                <p>This order was succesfully placed and is now processed.</p>
            </div>
            <div className={styles["number-data"]}>
                <div>
                    <span>Order number</span>
                    <span className={styles["bold-span"]}>{orderData.orderId}</span>
                </div>
                <div>
                    <span>Order date</span>
                    <span className={styles["bold-span"]}>{orderData.orderDate}</span>
                </div>
            </div>
            {orderData.orderedItems.map((item) => (
                <OrderItem item={item} key={item.title} />
            ))}
        </>
    );
};

export default OrderDetails;
