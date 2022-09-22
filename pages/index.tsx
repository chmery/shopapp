import { getProductsData } from "../helpers/helpers";
import CategoryShowcase from "../components/Products/CategoryShowcase/CategoryShowcase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useContext, useEffect } from "react";
import { AuthContext } from "../store/auth-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { favouritesActions } from "../store/favouritesSlice/favouritesSlice";

type Props = {
    data: ProductData[];
};

const Home = ({ data }: Props) => {
    const { setIsLoggedIn, setUserId, userId } = useContext(AuthContext) as AuthContext;
    const { setInitialFavouritesData, clearFavouritesData } = favouritesActions;
    const dispatch = useDispatch();

    /*     const setFavouritesData = async (userId: string) => {
        const docRef = doc(db, "favourites", userId);
        const docSnap = await getDoc(docRef);
        const favouritesData = docSnap.data();
        dispatch(setInitialFavouritesData(favouritesData as FavouriteItem[]));
    }; */

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserId(user.uid);
                //setFavouritesData(user.uid);
            } else {
                setIsLoggedIn(false);
                setUserId(null);
                //dispatch(clearFavouritesData());
            }
        });
    }, [auth]);

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

export default Home;
