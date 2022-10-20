import { useContext } from "react";
import { useSelector } from "react-redux";
import ProductsList from "../../components/Product/ProductsList/ProductsList";
import Loader from "../../components/UI/Loader/Loader";
import NoContentMessage from "../../components/UI/NoContentMessage/NoContentMessage";
import { AuthContext } from "../../store/auth-context";
import { RootState } from "../../store/store";

const Favourites = () => {
    const { authorizedUserId } = useContext(AuthContext);
    const favouriteItems = useSelector((state: RootState) => state.favourites.favouriteItems);

    if (!authorizedUserId) return <Loader />;

    if (!favouriteItems.length) {
        return (
            <NoContentMessage
                title={"No Favourites"}
                message={"You didn't add any products here yet."}
            />
        );
    }

    return (
        <>
            <h3>Favourites</h3>
            <ProductsList products={favouriteItems} />
        </>
    );
};

export default Favourites;
