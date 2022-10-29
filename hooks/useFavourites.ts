import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favouritesActions } from "../store/favouritesSlice/favouritesSlice";
import { RootState } from "../store/store";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const removeFavouriteItemFromDatabase = async (
    favouriteItem: FavouriteItem,
    authorizedUserId: string
) => {
    await updateDoc(doc(db, "favourites", `${authorizedUserId}`), {
        favouriteItems: arrayRemove(favouriteItem),
    });
};

const addFavouriteItemToDatabase = async (
    favouriteItem: FavouriteItem,
    authorizedUserId: string
) => {
    await updateDoc(doc(db, "favourites", `${authorizedUserId}`), {
        favouriteItems: arrayUnion(favouriteItem),
    });
};

const formatToFavouriteItem = (product: ProductData) => {
    return {
        title: product.title,
        image: product.image,
        id: product.id,
        price: product.price,
    };
};

const useFavourites = () => {
    const dispatch = useDispatch();

    const favouriteItems = useSelector((state: RootState) => state.favourites.favouriteItems);
    const [isInFavourites, setIsInFavourites] = useState(false);

    const checkIfInFavourites = (product: ProductData | FavouriteItem) => {
        const addedItem = favouriteItems.find((item) => item.id === product.id);
        addedItem ? setIsInFavourites(true) : setIsInFavourites(false);
    };

    const removeFromFavourites = (product: ProductData, authorizedUserId: string) => {
        const favouriteItem = formatToFavouriteItem(product);
        setIsInFavourites(false);
        removeFavouriteItemFromDatabase(favouriteItem, authorizedUserId);
        dispatch(favouritesActions.removeFromFavourites(favouriteItem));
    };

    const addToFavourites = (product: ProductData, authorizedUserId: string) => {
        const favouriteItem = formatToFavouriteItem(product);
        setIsInFavourites(true);
        addFavouriteItemToDatabase(favouriteItem, authorizedUserId);
        dispatch(favouritesActions.addToFavourites(favouriteItem));
    };

    return {
        setIsInFavourites,
        isInFavourites,
        checkIfInFavourites,
        removeFromFavourites,
        addToFavourites,
    };
};

export default useFavourites;
