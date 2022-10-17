import React, { useState } from "react";
import { doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { favouritesActions } from "../store/favouritesSlice/favouritesSlice";
import { getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext<AuthContext>({
    authorizedUserId: "",
    setAuthorizedUserId: (id) => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();

    const { setInitialFavouritesData, clearFavouritesData } = favouritesActions;
    const [authorizedUserId, setAuthorizedUserId] = useState<string>("");

    const setFavouritesData = async (userId: string) => {
        const docRef = doc(db, "favourites", userId);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();
        if (!docData) return;
        const favouritesData: FavouriteItem[] = docData.favouriteItems;
        dispatch(setInitialFavouritesData(favouritesData));
    };

    onAuthStateChanged(auth, (user) => {
        if (user && !authorizedUserId) {
            setAuthorizedUserId(user.uid);
            localStorage.setItem("uid", user.uid);
            setFavouritesData(user.uid);
            return;
        }

        if (!user && authorizedUserId) {
            setAuthorizedUserId("");
            localStorage.removeItem("uid");
            clearFavouritesData();
            return;
        }
    });

    const authContext = {
        authorizedUserId,
        setAuthorizedUserId,
    };

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
