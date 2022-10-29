import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";

export const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "favourites", user.uid), {
        favouriteItems: [],
    });
};

export const logOut = async () => {
    await signOut(auth);
};
