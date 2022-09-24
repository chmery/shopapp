import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";

export const AuthContext = React.createContext<AuthContext | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
