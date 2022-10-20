import { doc, arrayRemove, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/config";

export const removeFromFavourites = async (
    favouriteItem: FavouriteItem,
    authorizedUserId: string
) => {
    await updateDoc(doc(db, "favourites", `${authorizedUserId}`), {
        favouriteItems: arrayRemove(favouriteItem),
    });
};

export const addToFavourites = async (favouriteItem: FavouriteItem, authorizedUserId: string) => {
    await updateDoc(doc(db, "favourites", `${authorizedUserId}`), {
        favouriteItems: arrayUnion(favouriteItem),
    });
};
