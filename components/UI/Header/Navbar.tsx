import { useRouter } from "next/router";
import { HeartIcon, SearchIcon, UserIcon, CartIcon, CloseIcon } from "../Icons/Icons";

type Props = {
    onStopSearching: () => void;
    onStartSearching: () => void;
    isSearching: boolean;
};

const Navbar = ({ onStartSearching, onStopSearching, isSearching }: Props) => {
    const router = useRouter();

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
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
