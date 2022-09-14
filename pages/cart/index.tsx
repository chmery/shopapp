import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./Cart.module.css";
import CartSummary from "../../components/Cart/CartSummary/CartSummary";
import CartItem from "../../components/Cart/CartItem/CartItem";
import CartActions from "../../components/Cart/CartActions/CartActions";

const Cart = () => {
    const cartItemsNum = useSelector((state: RootState) => state.cart.cartItemsNum);
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const subTotal = cartItems.reduce(
        (total, cartItem) => (total += cartItem.item.price * cartItem.quantity),
        0
    );

    if (cartItemsNum < 1) {
        return (
            <div className={styles["no-items"]}>
                <h3>Your cart is empty</h3>
                <p>You haven't added any items to your cart yet</p>
            </div>
        );
    }

    return (
        <>
            <h3 className={styles["products-added"]}>{cartItemsNum} Products added</h3>
            {cartItemsNum > 0 && cartItems.map((cartItem) => <CartItem cartItem={cartItem} />)}
            <CartSummary subTotal={subTotal} />
            <CartActions />
        </>
    );
};

export default Cart;
