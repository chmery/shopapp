import Image from "next/future/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useIsInFavourites from "../../../hooks/useIsInFavourites";
import { favouritesActions } from "../../../store/favouritesSlice/favouritesSlice";
import { XIcon } from "../../UI/Icons/Icons";
import styles from "./ProductItem.module.css";

type Props = {
    productData: ProductData | FavouriteItem;
};

const ProductItem = ({ productData }: Props) => {
    const dispatch = useDispatch();
    const { removeFromFavourites } = favouritesActions;
    const { checkIfInFavourites, isInFavourites } = useIsInFavourites();

    const title = `${productData.title.slice(0, 40)}...`;
    const price = `$${productData.price}`;

    const router = useRouter();
    const { pathname } = router;

    const removeFromFavouritesHandler = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(removeFromFavourites(productData as FavouriteItem));
    };

    useEffect(() => {
        checkIfInFavourites(productData);
    });

    return (
        <div
            className={styles.product}
            onClick={() => router.push(`/product?id=${productData.id}`)}
        >
            <div className={styles["product-image"]}>
                <Image src={productData.image} alt={productData.title} fill />
            </div>
            <h3>{title}</h3>
            <div className={styles["price-x"]}>
                <span>{price}</span>
                {isInFavourites && pathname === "/favourites" && (
                    <button onClick={removeFromFavouritesHandler}>
                        <XIcon />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductItem;
