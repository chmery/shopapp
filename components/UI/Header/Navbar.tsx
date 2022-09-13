import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { HeartIcon, SearchIcon, UserIcon, CartIcon, CloseIcon } from "../Icons/Icons";
import styles from "./Navbar.module.css";

type Props = {
    onStopSearching: () => void;
    onStartSearching: () => void;
    isSearching: boolean;
};

const Navbar = ({ onStartSearching, onStopSearching, isSearching }: Props) => {
    const router = useRouter();
    const cartItemsNum = useSelector((state: RootState) => state.cart.cartItemsNum);

    const NavbarSearchItem = () => {
        const searchingJSX = (
            <li onClick={onStopSearching}>
                <CloseIcon />
            </li>
        );

        const notSearchingJSX = (
            <li onClick={onStartSearching}>
                <SearchIcon />
            </li>
        );

        return isSearching ? searchingJSX : notSearchingJSX;
    };

    return (
        <nav>
            <ul>
                {<NavbarSearchItem />}
                <li onClick={() => router.push("/favourites")}>
                    <HeartIcon />
                </li>
                <li onClick={() => router.push("/account")}>
                    <UserIcon />
                </li>
                <li onClick={() => router.push("/cart")}>
                    <CartIcon />
                    {cartItemsNum > 0 && (
                        <div className={styles["items-number"]}>{cartItemsNum}</div>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
