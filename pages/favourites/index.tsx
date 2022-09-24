import { useSelector } from "react-redux";
import ProductsList from "../../components/Products/ProductsList/ProductsList";
import { RootState } from "../../store/store";
import styles from "./Favourites.module.css";

const Favourites = () => {
    const favouriteItems = useSelector((state: RootState) => state.favourites.favouriteItems);

    if (!favouriteItems.length) {
        return (
            <div className={styles["no-favourites"]}>
                <h3>No Favourites</h3>
                <p>You didn't add any products here yet.</p>
            </div>
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
