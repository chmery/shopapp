import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Image from "next/future/image";
import styles from "./Cart.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice/cartSlice";
import { MinusIcon, PlusIcon } from "../../components/UI/Icons/Icons";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
    cartItem: {
        item: ProductData;
        quantity: number;
    };
};

const Cart = () => {
    const cartItemsNum = useSelector((state: RootState) => state.cart.cartItemsNum);
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const router = useRouter();
    const dispatch = useDispatch();

    const subTotal = cartItems.reduce(
        (total, cartItem) => (total += cartItem.item.price * cartItem.quantity),
        0
    );

    const removeItemHandler = (id: number) => dispatch(cartActions.removeFromCart(id));
    const addItemHandler = (item: ProductData) => dispatch(cartActions.addToCart(item));

    const CartItem = ({ cartItem }: Props) => {
        const { item } = cartItem;

        const goToProductPageHandler = () => router.push(`/product?id=${item.id}`);
        const goToCategoryHandler = () => router.push(`/${item.category}`);

        return (
            <div className={styles["cart-item"]}>
                <div className={styles["product-image"]} onClick={goToProductPageHandler}>
                    <Image src={item.image} alt={item.title} fill />
                </div>

                <div className={styles["product-info"]}>
                    <div className={styles["title-price"]}>
                        <h3 onClick={goToProductPageHandler}>{item.title}</h3>
                        <span>${item.price}</span>
                    </div>

                    <div className={styles["category-quantity"]}>
                        <span onClick={goToCategoryHandler}>{item.category}</span>
                        <div>
                            <button onClick={removeItemHandler.bind(null, item.id)}>
                                <MinusIcon />
                            </button>
                            <span>{cartItem.quantity}</span>
                            <button onClick={addItemHandler.bind(null, item)}>
                                <PlusIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

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
            <div className={styles.items}>
                {cartItemsNum > 0 && cartItems.map((cartItem) => <CartItem cartItem={cartItem} />)}
            </div>
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

            <div className={styles["checkout-actions"]}>
                <button>Checkout as a guest</button>
                <p>
                    <Link href="/signin">Sign in</Link> for better user and checkout experience in
                    the future or don't do it and continue as a guest.
                </p>
            </div>
        </>
    );
};

export default Cart;
