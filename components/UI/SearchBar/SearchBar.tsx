import { SearchIcon } from "../Icons/Icons";
import React, { useRef, useState } from "react";

import styles from "./SearchBar.module.css";
import SearchBarPropmts from "./SearchBarPrompts";

type Props = {
    ref: React.MutableRefObject<HTMLDivElement>;
};

const SearchBar = React.forwardRef<HTMLDivElement, Props>((_, ref) => {
    const [isTyping, setIsTyping] = useState(false);

    const searchInput = useRef<HTMLInputElement>(null);

    const typingHandler = () => {
        searchInput.current?.value ? setIsTyping(true) : setIsTyping(false);
    };

    return (
        <>
            <div className={styles["search-bar"]} ref={ref}>
                <input
                    type="text"
                    onChange={typingHandler}
                    ref={searchInput}
                    className={isTyping ? styles["typing-input"] : ""}
                />
                <button className={isTyping ? styles["typing-btn"] : ""}>
                    <SearchIcon />
                </button>
            </div>
            {isTyping && <SearchBarPropmts />}
        </>
    );
});

export default SearchBar;
