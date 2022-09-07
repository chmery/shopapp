import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import SearchBar from "../SearchBar/SearchBar";
import { useRouter } from "next/router";

import styles from "./Header.module.css";

const Header = () => {
    const [isSearching, setIsSearching] = useState(false);

    const startSearchingHandler = () => setIsSearching(true);
    const stopSearchingHandler = () => setIsSearching(false);

    const searchBarRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    useEffect(() => {
        const clickHandler = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setIsSearching(false);
            }
        };

        document.addEventListener("click", clickHandler, true);

        return () => document.removeEventListener("click", clickHandler, true);
    }, [searchBarRef]);

    useEffect(() => {
        router.events.on("routeChangeStart", () => setIsSearching(false));
        return () => router.events.off("routeChangeStart", () => setIsSearching(false));
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles["header-content"]}>
                <Link href="/">ShopApp</Link>
                <Navbar
                    onStartSearching={startSearchingHandler}
                    onStopSearching={stopSearchingHandler}
                    isSearching={isSearching}
                />
            </div>
            {isSearching && <SearchBar ref={searchBarRef} />}
        </header>
    );
};

export default Header;
