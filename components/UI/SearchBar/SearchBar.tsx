import { SearchIcon } from "../Icons/Icons";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { getProductsData } from "../../../helpers/helpers";
import { getMatchingProducts } from "./helpers";

import styles from "./SearchBar.module.css";
import SearchBarPrompts from "./SearchBarPrompts";

type SearchEvent = React.KeyboardEvent<HTMLInputElement> & React.MouseEvent<HTMLButtonElement>;

const SearchBar = React.forwardRef<HTMLDivElement>((_, ref) => {
    const [arePromptsVisible, setArePromptsVisible] = useState(false);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [prompts, setPrompts] = useState<ProductData[]>([]);

    useEffect(() => {
        const setProductsData = async () => {
            const data = await getProductsData();
            setProducts(data);
        };

        setProductsData();
    }, []);

    const searchInput = useRef<HTMLInputElement>(null!);

    const typingHandler = () => {
        if (searchInput.current.value) {
            const matchingProducts = getMatchingProducts(searchInput.current.value, products);

            if (matchingProducts.length === 0) {
                setArePromptsVisible(false);
                setPrompts([]);
            } else {
                setArePromptsVisible(true);
                setPrompts(matchingProducts);
            }
            return;
        }
        setArePromptsVisible(false);
    };

    const router = useRouter();

    const searchHandler = (event: SearchEvent) => {
        if (!searchInput.current.value) return;

        if (event.key === "Enter" || event.type === "click") {
            router.push(`/results?keyword=${searchInput.current.value}`);
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
                    className={arePromptsVisible ? styles["prompts-input"] : ""}
                />
                <button
                    className={arePromptsVisible ? styles["prompts-btn"] : ""}
                    onClick={searchHandler}
                >
                    <SearchIcon />
                </button>
            </div>
            {arePromptsVisible && <SearchBarPrompts prompts={prompts} ref={ref} />}
        </>
    );
});

export default SearchBar;
