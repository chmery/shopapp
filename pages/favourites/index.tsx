import { useSelector } from "react-redux";
import ProductsList from "../../components/Products/ProductsList/ProductsList";
import { RootState } from "../../store/store";

const Favourites = () => {
    const favouriteItems = useSelector((state: RootState) => state.favourites.favouriteItems);

    return (
        <>
            <h3>Favourites</h3>
            <ProductsList products={favouriteItems} />
        </>
    );
};

export default Favourites;
