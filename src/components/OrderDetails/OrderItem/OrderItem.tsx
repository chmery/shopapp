import Image from "next/future/image";
import { capitalize } from "../../../helpers/general";
import styles from "./OrderItem.module.css";

type Props = {
    item: {
        quantity: number;
        title: string;
        category: string;
        image: string;
        price: number;
    };
};

const OrderItem = ({ item }: Props) => {
    const category = capitalize(item.category);

    return (
        <>
            <div className={styles["order-item"]}>
                <div className={styles["product-image"]}>
                    <Image src={item.image} alt={item.title} fill />
                </div>
                <div className={styles["product-details"]}>
                    <div className={styles["title-price"]}>
                        <h3>{item.title}</h3>
                        <span>${item.price}</span>
                    </div>
                    <div className={styles["category-quantity"]}>
                        <span>{category}</span>
                        <span>Quantity: {item.quantity}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderItem;
