import Link from "next/link";
import styles from "./OrderItem.module.css";
import Image from "next/future/image";

const OrderItem = ({ orderData }: { orderData: OrderData }) => {
    return (
        <div className={styles.order}>
            <div className={styles["date-title"]}>
                <span>{orderData.orderDate}</span>
                <span>${orderData.totalPrice}</span>
            </div>
            <div className={styles["products-images"]}>
                {orderData.orderedItems.map((item) => (
                    <div className={styles["product-image"]}>
                        <Image src={item.image} alt={item.title} fill />
                    </div>
                ))}
            </div>
            <Link className={styles["details-link"]} href={`/order-details/${orderData.orderId}`}>
                See Order Details
            </Link>
        </div>
    );
};

export default OrderItem;
