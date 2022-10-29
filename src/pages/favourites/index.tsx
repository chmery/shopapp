import { useContext } from "react";
import { useSelector } from "react-redux";
import ProductsList from "../../components/Product/ProductsList/ProductsList";
import Loader from "../../components/UI/Loader/Loader";
import NoContentMessage from "../../components/UI/NoContentMessage/NoContentMessage";
import { AuthContext } from "../../store/auth-context";
import { RootState } from "../../store/store";

const Favourites = () => {
    const { areFavouritesLoading } = useContext(AuthContext);
    const favouriteItems = useSelector((state: RootState) => state.favourites.favouriteItems);

    const hasFavourites = !areFavouritesLoading && favouriteItems.length;
    const hasNoFavourites = !areFavouritesLoading && !favouriteItems.length;

    return (
        <>
            {areFavouritesLoading && <Loader />}
            {hasNoFavourites && (
                <NoContentMessage
                    title={"No Favourites"}
                    message={"You didn't add any products here yet."}
                />
            )}
            {hasFavourites && <ProductsList products={favouriteItems} title={"Favourites"} />}
        </>
    );
};

export default Favourites;
