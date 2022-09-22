import React, { useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

export const AuthContext = React.createContext<AuthContext | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logInHandler = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signUpHandler = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const logOutHandler = async () => {
        await signOut(auth);
    };

    /*     useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserId(user.uid);
            } else {
                setIsLoggedIn(false);
                setUserId(null);
            }
        });
    }, [auth]); */

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
