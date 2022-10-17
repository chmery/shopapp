import Image from "next/future/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useIsInFavourites from "../../../hooks/useIsInFavourites";
import { favouritesActions } from "../../../store/favouritesSlice/favouritesSlice";
import Icons from "../../UI/Icons/Icons";
import styles from "./ProductItem.module.css";
import { db } from "../../../firebase/config";
import { updateDoc, doc, arrayRemove } from "firebase/firestore";
import { AuthContext } from "../../../store/auth-context";
import Loader from "../../UI/Loader/Loader";

type Props = {
    productData: ProductData | FavouriteItem;
};

const ProductItem = ({ productData }: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { authorizedUserId } = useContext(AuthContext);
    const { removeFromFavourites } = favouritesActions;

    const { checkIfInFavourites, isInFavourites } = useIsInFavourites();

    const [isLoading, setIsLoading] = useState(false);

    const title = `${productData.title.slice(0, 40)}...`;
    const price = `$${productData.price}`;

    const { pathname } = router;

    const removeFromFavouritesHandler = async (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsLoading(true);
        await updateDoc(doc(db, "favourites", `${authorizedUserId}`), {
            favouriteItems: arrayRemove(productData),
        });
        dispatch(removeFromFavourites(productData as FavouriteItem));
        setIsLoading(false);
    };

    useEffect(() => {
        checkIfInFavourites(productData);
    }, []);

    if (isLoading) return <Loader />;

    return (
        <div
            className={styles.product}
            onClick={() => router.push(`/product?id=${productData.id}`)}
        >
            <div className={styles["product-image"]}>
                <Image src={productData.image} alt={productData.title} fill />
            </div>
            <h3>{title}</h3>
            <div className={styles["price-remove"]}>
                <span>{price}</span>
                {isInFavourites && pathname === "/favourites" && (
                    <button onClick={removeFromFavouritesHandler}>
                        <Icons.Remove />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductItem;
