import React, { useState } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { favouritesActions } from "../store/favouritesSlice/favouritesSlice";

export const AuthContext = React.createContext<AuthContext | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();

    const [userId, setUserId] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { setInitialFavouritesData, clearFavouritesData } = favouritesActions;

    const logInHandler = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signUpHandler = async (email: string, password: string) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "favourites", user.uid), {
            favouriteItems: [],
        });
    };

    const logOutHandler = async () => {
        await signOut(auth);
    };

    const setFavouritesData = async (userId: string) => {
        const docRef = doc(db, "favourites", userId);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();
        const favouritesData: FavouriteItem[] = docData!.favouriteItems;
        dispatch(setInitialFavouritesData(favouritesData));
    };

    onAuthStateChanged(auth, (user) => {
        if (user && !isLoggedIn) {
            setIsLoggedIn(true);
            setUserId(user.uid);
            setFavouritesData(user.uid);
            return;
        }

        if (!user && isLoggedIn) {
            setIsLoggedIn(false);
            setUserId(null);
            clearFavouritesData();
            return;
        }
    });

    const authContext = {
        isLoggedIn,
        userId,
        setUserId,
        setIsLoggedIn,
        logIn: logInHandler,
        logOut: logOutHandler,
        signUp: signUpHandler,
    };

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
