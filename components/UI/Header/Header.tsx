import Link from "next/link";
import { useRouter } from "next/router";
import { HeartIcon, SearchIcon, UserIcon, CartIcon } from "../Icons/Icons";

import styles from "./Header.module.css";

const Header = () => {
    const router = useRouter();

    return (
        <header className={styles.header}>
            <p className={styles.logo}>
                <Link href="/">ShopApp</Link>
            </p>
            <nav>
                <ul>
                    <li>
                        <SearchIcon />
                    </li>
                    <li>
                        <HeartIcon
                            onClick={() => {
                                router.push("/favourites");
                            }}
                        />
                    </li>
                    <li>
                        <UserIcon
                            onClick={() => {
                                router.push("/account");
                            }}
                        />
                    </li>
                    <li>
                        <CartIcon
                            onClick={() => {
                                router.push("/cart");
                            }}
                        />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
