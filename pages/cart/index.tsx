import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./Cart.module.css";
import PriceSummary from "../../components/Cart/PriceSummary/PriceSummary";
import CartItem from "../../components/Cart/CartItem/CartItem";
import CartActions from "../../components/Cart/CartActions/CartActions";
import { useContext, useState } from "react";
import { cartActions } from "../../store/cartSlice/cartSlice";
import { Alert } from "@mui/material";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../store/auth-context";
import NoContentMessage from "../../components/UI/NoContentMessage/NoContentMessage";
import { getFormattedDate } from "../../helpers/helpers";
import SuccesAlert from "../../components/UI/SuccesAlert/SuccesAlert";

const Cart = () => {
    const [isOrdering, setIsOrdering] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);
    const SHIPPING_COST = 10;

    const dispatch = useDispatch();
    const { authorizedUserId } = useContext(AuthContext);

    const orderHandler = async () => {
        setIsOrdering(true);

        const orderedItems: {
            quantity: number;
            title: string;
            category: string;
            image: string;
            price: number;
        }[] = [];

        const orderDate = getFormattedDate();
        const randomNumber = Math.floor(Math.random() * 1000);
        const orderId = `${new Date().getTime().toString().slice(4)}${randomNumber}`;

        cartItems.forEach((cartItem) => {
            orderedItems.push({
                title: cartItem.item.title,
                category: cartItem.item.category,
                image: cartItem.item.image,
                price: cartItem.item.price,
                quantity: cartItem.quantity,
            });
        });

        await addDoc(collection(db, "orders"), {
            orderId,
            orderedItems,
            orderDate,
            authorizedUserId,
            totalPrice,
        });

        dispatch(cartActions.clearCart());
        setIsOrdering(false);
        setIsOrdered(true);
    };

    const cartItemsNum = useSelector((state: RootState) => state.cart.cartItemsNum);
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const subTotal =
        cartItems.reduce(
            (total, cartItem) => (total += cartItem.item.price * 100 * cartItem.quantity),
            0
        ) / 100;

    const totalPrice = (subTotal * 100 + SHIPPING_COST * 100) / 100;

    const closeSuccesAlertHandler = () => setIsOrdered(false);

    if (!cartItemsNum) {
        return (
            <>
                {isOrdered && <SuccesAlert onClose={closeSuccesAlertHandler} />}
                <NoContentMessage
                    title={"Your cart is empty"}
                    message={"You haven't added any items to your cart yet."}
                />
            </>
        );
    }

    return (
        <>
            <h3 className={styles["products-added"]}>{cartItemsNum} Products added</h3>
            {cartItemsNum &&
                cartItems.map((cartItem) => (
                    <CartItem cartItem={cartItem} key={cartItem.item.id} />
                ))}
            <PriceSummary totalPrice={totalPrice} />
            <CartActions onOrder={orderHandler} isOrdering={isOrdering} />
        </>
    );
};

export default Cart;
