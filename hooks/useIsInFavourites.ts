import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useIsInFavourites = () => {
    const favouriteItems = useSelector((state: RootState) => state.favourites.favouriteItems);
    const [isInFavourites, setIsInFavourites] = useState(false);

    const checkIfInFavourites = (product: ProductData) => {
        const addedItem = favouriteItems.find((item) => item.id === product.id);
        addedItem ? setIsInFavourites(true) : setIsInFavourites(false);
    };

    return { setIsInFavourites, isInFavourites, checkIfInFavourites };
};

export default useIsInFavourites;
