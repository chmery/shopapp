import styles from "./CartActions.module.css";
import Link from "next/link";
import Spinner from "../../UI/Spinner/Spinner";

type Props = {
    onOrder: () => void;
    isOrdering: boolean;
};

const CartActions = ({ onOrder, isOrdering }: Props) => {
    return (
        <div className={styles["checkout-actions"]}>
            {!isOrdering && <button onClick={onOrder}>Checkout as a guest</button>}
            {isOrdering && (
                <button className={styles["sending-btn"]}>
                    Sending order <Spinner />
                </button>
            )}

            {!isOrdering && (
                <p>
                    <Link href="/auth?action=login">Log in</Link> for better user and checkout
                    experience in the future or don't do it and continue as a guest.
                </p>
            )}
        </div>
    );
};

export default CartActions;
