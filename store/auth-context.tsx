import React, { useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/config";

type AuthContextType = {
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    currentUser: string | null;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    const loginHandler = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signUpHandler = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? setCurrentUser(user.uid) : setCurrentUser(null);
        });
    }, [auth]);

    const authContext = {
        currentUser,
        login: loginHandler,
        signUp: signUpHandler,
    };

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
