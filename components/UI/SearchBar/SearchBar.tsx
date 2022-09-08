import { SearchIcon } from "../Icons/Icons";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

import styles from "./SearchBar.module.css";
import SearchBarPropmts from "./SearchBarPrompts";

type Props = {
    ref: React.MutableRefObject<HTMLDivElement>;
};

const SearchBar = React.forwardRef<HTMLDivElement, Props>((_, ref) => {
    const [isTyping, setIsTyping] = useState(false);

    const router = useRouter();

    const searchInput = useRef<HTMLInputElement>(null);

    const typingHandler = () => {
        searchInput.current?.value ? setIsTyping(true) : setIsTyping(false);
    };

    const searchHandler = (
        event: React.KeyboardEvent<HTMLInputElement> & React.MouseEvent<HTMLButtonElement>
    ) => {
        if (searchInput.current?.value === null) return;

        if (event.key === "Enter" || event.type === "click") {
            router.push(`/results?keyword=${searchInput.current!.value}`);
        }
    };

    return (
        <>
            <div className={styles["search-bar"]} ref={ref}>
                <input
                    type="text"
                    placeholder="Search by product name"
                    onChange={typingHandler}
                    onKeyDown={searchHandler}
                    ref={searchInput}
                    className={isTyping ? styles["typing-input"] : ""}
                />
                <button className={isTyping ? styles["typing-btn"] : ""} onClick={searchHandler}>
                    <SearchIcon />
                </button>
            </div>
            {isTyping && <SearchBarPropmts />}
        </>
    );
});

export default SearchBar;
