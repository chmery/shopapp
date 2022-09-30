import styles from "./CartActions.module.css";
import Link from "next/link";
import Spinner from "../../UI/Spinner/Spinner";
import { useContext } from "react";
import { AuthContext } from "../../../store/auth-context";

type Props = {
    onOrder: () => void;
    isOrdering: boolean;
};

const CartActions = ({ onOrder, isOrdering }: Props) => {
    const { isLoggedIn } = useContext(AuthContext) as AuthContext;

    return (
        <div className={styles["checkout-actions"]}>
            {!isOrdering && (
                <button className="main-btn" onClick={onOrder}>
                    {isLoggedIn ? "Checkout" : "Checkout as a guest"}
                </button>
            )}
            {isOrdering && (
                <button className="main-btn" disabled>
                    Sending order <Spinner />
                </button>
            )}

            {!isOrdering && !isLoggedIn && (
                <p>
                    <Link href="/auth?action=login">Log in</Link> for better user and checkout
                    experience in the future or don't do it and continue as a guest.
                </p>
            )}
        </div>
    );
};

export default CartActions;
