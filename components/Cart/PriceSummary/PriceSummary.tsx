import styles from "./PriceSummary.module.css";

type Props = {
    totalPrice: number;
};

const PriceSummary = ({ totalPrice }: Props) => {
    const SHIPPING_COST = 10;
    const subTotal = (totalPrice * 1000 - SHIPPING_COST * 1000) / 1000;

    return (
        <div className={styles.summary}>
            <div>
                <span>Sub-Total</span>
                <span className={styles.subtotal}>${subTotal}</span>
            </div>
            <div>
                <span>Shipping</span>
                <span className={styles.shipping}>${SHIPPING_COST}</span>
            </div>
            <div className={styles.total}>
                <span>Total</span>
                <span className={styles["total-price"]}>${totalPrice}</span>
            </div>
        </div>
    );
};

export default PriceSummary;
