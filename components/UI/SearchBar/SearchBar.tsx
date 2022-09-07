import { SearchIcon } from "../Icons/Icons";
import React from "react";

import styles from "./SearchBar.module.css";

type Props = {
    ref: React.MutableRefObject<HTMLDivElement>;
};

const SearchBar = React.forwardRef<HTMLDivElement, Props>((_, ref) => {
    return (
        <div className={styles["search-bar"]} ref={ref}>
            <input type="text" />
            <button>
                <SearchIcon />
            </button>
        </div>
    );
});

export default SearchBar;
