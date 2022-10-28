import { doc, arrayRemove, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";

// general

export const getProductsData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
};

export const getProductsByCategory = (data: ProductData[], category: string, amount: number) => {
    if (category === "bestsellers") return data.slice(0, amount);
    const products = data.filter((product) => product.category === category);
    return products.slice(0, amount);
};

export const capitalize = (word: string) => {
    const capitalized = `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    return capitalized;
};

export const getFormattedDate = () =>
    new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

// cookies

export const setCookie = (name: string, value: string, hoursToExpire: number) => {
    if (doesCookieExists(name)) return;
    const currentDate = new Date();
    const cookieExpirationDate = new Date(currentDate.getTime() + hoursToExpire * 3600 * 1000);
    document.cookie = `${name}=${value}; Path=/; expires=${cookieExpirationDate}`;
};

export const removeCookie = (name: string) =>
    (document.cookie = `${name}=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`);

export const doesCookieExists = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? true : false;
};

// favourites

export const removeFavouriteItemFromDatabase = async (
    favouriteItem: FavouriteItem,
    authorizedUserId: string
) => {
    await updateDoc(doc(db, "favourites", `${authorizedUserId}`), {
        favouriteItems: arrayRemove(favouriteItem),
    });
};

export const addFavouriteItemToDatabase = async (
    favouriteItem: FavouriteItem,
    authorizedUserId: string
) => {
    await updateDoc(doc(db, "favourites", `${authorizedUserId}`), {
        favouriteItems: arrayUnion(favouriteItem),
    });
};
