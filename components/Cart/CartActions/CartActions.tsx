import styles from "./CartActions.module.css";
import Link from "next/link";

const CartActions = () => {
    return (
        <div className={styles["checkout-actions"]}>
            <button>Checkout as a guest</button>
            <p>
                <Link href="/signin">Sign in</Link> for better user and checkout experience in the
                future or don't do it and continue as a guest.
            </p>
        </div>
    );
};

export default CartActions;
