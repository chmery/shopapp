import { doc, arrayRemove, updateDoc, arrayUnion } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/config";
import { favouritesActions } from "../../store/favouritesSlice/favouritesSlice";

export const removeFromFavourites = async (
    favouriteItem: FavouriteItem,
    authorizedUserId: string
) => {
    const dispatch = useDispatch();
    await updateDoc(doc(db, "favourites", `${authorizedUserId}`), {
        favouriteItems: arrayRemove(favouriteItem),
    });
    dispatch(favouritesActions.removeFromFavourites(favouriteItem));
};

export const addToFavourites = async (favouriteItem: FavouriteItem, authorizedUserId: string) => {
    const dispatch = useDispatch();
    await updateDoc(doc(db, "favourites", `${authorizedUserId}`), {
        favouriteItems: arrayUnion(favouriteItem),
    });
    dispatch(favouritesActions.addToFavourites(favouriteItem));
};
