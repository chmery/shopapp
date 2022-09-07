import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import SearchBar from "../SearchBar/SearchBar";

import styles from "./Header.module.css";

const Header = () => {
    const [isSearching, setIsSearching] = useState(false);

    const startSearchingHandler = () => setIsSearching(true);
    const stopSearchingHandler = () => setIsSearching(false);

    const searchBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickHandler = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setIsSearching(false);
            }
        };

        document.addEventListener("click", clickHandler, true);

        return () => document.removeEventListener("click", clickHandler, true);
    }, [searchBarRef]);

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
