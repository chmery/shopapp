import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./Cart.module.css";
import CartSummary from "../../components/Cart/CartSummary/CartSummary";
import CartItem from "../../components/Cart/CartItem/CartItem";
import CartActions from "../../components/Cart/CartActions/CartActions";
import { useContext, useState } from "react";
import { cartActions } from "../../store/cartSlice/cartSlice";
import { Alert } from "@mui/material";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../store/auth-context";

const Cart = () => {
    const [isOrdering, setIsOrdering] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);

    const dispatch = useDispatch();
    const { userId } = useContext(AuthContext) as AuthContext;

    const orderHandler = async () => {
        setIsOrdering(true);

        const orderedItems: { id: number; quantity: number; totalPrice: number }[] = [];
        const orderDate = new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        cartItems.forEach((cartItem) => {
            orderedItems.push({
                id: cartItem.item.id,
                quantity: cartItem.quantity,
                totalPrice: subTotal,
            });
        });

        await addDoc(collection(db, "orders"), {
            orderedItems,
            orderDate,
            userId,
        });

        dispatch(cartActions.clearCart());
        setIsOrdering(false);
        setIsOrdered(true);
    };

    const cartItemsNum = useSelector((state: RootState) => state.cart.cartItemsNum);
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const subTotal = cartItems.reduce(
        (total, cartItem) => (total += cartItem.item.price * cartItem.quantity),
        0
    );

    const SuccesAlert = () => {
        return (
            <Alert severity="success" onClose={() => setIsOrdered(false)}>
                Your order has been successfully placed!
            </Alert>
        );
    };

    if (!cartItemsNum) {
        return (
            <>
                {isOrdered && <SuccesAlert />}
                <div className={styles.message}>
                    <h3>Your cart is empty</h3>
                    <p>You haven't added any items to your cart yet.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <h3 className={styles["products-added"]}>{cartItemsNum} Products added</h3>
            {cartItemsNum && cartItems.map((cartItem) => <CartItem cartItem={cartItem} />)}
            <CartSummary subTotal={subTotal} />
            <CartActions onOrder={orderHandler} isOrdering={isOrdering} />
        </>
    );
};

export default Cart;
