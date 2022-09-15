import styles from "./CartItem.module.css";
import { useRouter } from "next/router";
import Image from "next/future/image";
import { MinusIcon, PlusIcon } from "../../UI/Icons/Icons";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice/cartSlice";

type Props = {
    cartItem: {
        item: ProductData;
        quantity: number;
    };
};

const CartItem = ({ cartItem }: Props) => {
    const { item } = cartItem;

    const dispatch = useDispatch();
    const router = useRouter();

    const goToProductPageHandler = () => router.push(`/product?id=${item.id}`);
    const goToCategoryHandler = () => router.push(`/${item.category}`);

    const removeItemHandler = (id: number) => dispatch(cartActions.removeFromCart(id));
    const addItemHandler = (item: ProductData) => dispatch(cartActions.addToCart(item));

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

export default CartItem;
