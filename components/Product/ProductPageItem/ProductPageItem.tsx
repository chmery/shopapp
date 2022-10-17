import Icons from "../../UI/Icons/Icons";
import styles from "./ProductPageItem.module.css";
import Image from "next/future/image";
import { Rating } from "@mui/material";

type Props = {
    product: ProductData;
    authorizedUserId: string;
    isInFavourites: boolean;
    onAddToFavourites: () => void;
    onAddToCart: () => void;
};

const ProductPageItem = ({
    product,
    authorizedUserId,
    isInFavourites,
    onAddToCart,
    onAddToFavourites,
}: Props) => {
    return (
        <div className={styles.product}>
            <div className={styles["product-image"]}>
                <Image src={product.image} alt={product.title} fill />
            </div>
            <div className={styles.description}>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <div className={styles.rating}>
                    <Rating
                        name="product-rating"
                        value={product.rating.rate}
                        precision={0.5}
                        readOnly
                    />
                    <span className={styles["rating-score"]}>{product.rating.rate}/5.0</span>
                    <span className={styles["rating-count"]}>{product.rating.count} votes</span>
                </div>
                <span className={styles.price}>${product.price}</span>
                <div className={styles.buttons}>
                    <button className="main-btn" onClick={onAddToCart}>
                        Add to Cart
                    </button>
                    {authorizedUserId && (
                        <button
                            className={`${styles["fav-btn"]} ${
                                isInFavourites ? styles["fav-btn-added"] : ""
                            }`}
                            onClick={onAddToFavourites}
                        >
                            Favourites
                            <Icons.Heart />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPageItem;
