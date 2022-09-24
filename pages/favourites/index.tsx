import { useSelector } from "react-redux";
import ProductsList from "../../components/Products/ProductsList/ProductsList";
import NoContentMessage from "../../components/UI/NoContentMessage/NoContentMessage";
import { RootState } from "../../store/store";

const Favourites = () => {
    const favouriteItems = useSelector((state: RootState) => state.favourites.favouriteItems);

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
