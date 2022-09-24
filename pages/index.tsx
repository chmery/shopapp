import { getProductsData } from "../helpers/helpers";
import CategoryShowcase from "../components/Products/CategoryShowcase/CategoryShowcase";
import { useDispatch } from "react-redux";
import { favouritesActions } from "../store/favouritesSlice/favouritesSlice";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { onAuthStateChanged } from "firebase/auth";

type Props = {
    data: ProductData[];
};

const Homepage = ({ data }: Props) => {
    const dispatch = useDispatch();
    const { setInitialFavouritesData, clearFavouritesData } = favouritesActions;
    const { isLoggedIn, setIsLoggedIn, setUserId } = useContext(AuthContext) as AuthContext;

    const setFavouritesData = async (userId: string) => {
        const docRef = doc(db, "favourites", userId);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();
        const favouritesData: FavouriteItem[] = docData!.favouriteItems;
        dispatch(setInitialFavouritesData(favouritesData));
    };

    onAuthStateChanged(auth, (user) => {
        if (user && !isLoggedIn) {
            setIsLoggedIn(true);
            setUserId(user.uid);
            setFavouritesData(user.uid);
            return;
        }

        if (!user && isLoggedIn) {
            setIsLoggedIn(false);
            setUserId(null);
            clearFavouritesData();
            return;
        }
    });

    const categories = ["bestsellers"];

    data.forEach((product) => {
        if (!categories.includes(product.category)) categories.push(product.category);
    });

    return (
        <div>
            {categories.map((category) => (
                <CategoryShowcase products={data} category={category} />
            ))}
        </div>
    );
};

export const getStaticProps = async () => {
    const data = await getProductsData();

    return {
        props: {
            data,
        },
    };
};

export default Homepage;
