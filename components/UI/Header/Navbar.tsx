import { useRouter } from "next/router";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../../store/auth-context";
import { RootState } from "../../../store/store";
import Icons from "../Icons/Icons";
import styles from "./Navbar.module.css";

type Props = {
    onStopSearching: () => void;
    onStartSearching: () => void;
    isSearching: boolean;
};

const Navbar = ({ onStartSearching, onStopSearching, isSearching }: Props) => {
    const router = useRouter();
    const cartItemsNum = useSelector((state: RootState) => state.cart.cartItemsNum);
    const { isLoggedIn } = useContext(AuthContext) as AuthContext;

    const NavbarSearchItem = () => {
        const searchingJSX = (
            <li onClick={onStopSearching}>
                <Icons.Close />
            </li>
        );

        const notSearchingJSX = (
            <li onClick={onStartSearching}>
                <Icons.Search />
            </li>
        );

        return isSearching ? searchingJSX : notSearchingJSX;
    };

    const NavbarFavouritesItem = () => {
        return (
            <li onClick={() => router.push("/favourites")}>
                <Icons.Heart />
            </li>
        );
    };

    return (
        <nav>
            <ul>
                {<NavbarSearchItem />}
                {isLoggedIn && <NavbarFavouritesItem />}
                <li onClick={() => router.push("/profile")}>
                    <Icons.User />
                </li>
                <li onClick={() => router.push("/cart")}>
                    <Icons.Cart />
                    {cartItemsNum > 0 && (
                        <div className={styles["items-number"]}>{cartItemsNum}</div>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
