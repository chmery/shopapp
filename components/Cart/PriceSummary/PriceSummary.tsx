import styles from "./PriceSummary.module.css";

type Props = {
    subTotal: number;
};

const PriceSummary = ({ subTotal }: Props) => {
    return (
        <div className={styles.summary}>
            <div>
                <span>Sub-Total</span>
                <span className={styles.subtotal}>${subTotal}</span>
            </div>
            <div>
                <span>Shipping</span>
                <span className={styles.shipping}>$10.00</span>
            </div>
            <div className={styles.total}>
                <span>Total</span>
                <span className={styles["total-price"]}>${subTotal + 10}</span>
            </div>
        </div>
    );
};

export default PriceSummary;
