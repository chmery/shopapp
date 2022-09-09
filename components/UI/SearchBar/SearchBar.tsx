import { SearchIcon } from "../Icons/Icons";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { getProductsData } from "../../../helpers/getProductsData";

import styles from "./SearchBar.module.css";
import SearchBarPrompts from "./SearchBarPrompts";

type Props = {
    ref: React.MutableRefObject<HTMLDivElement>;
};

const SearchBar = React.forwardRef<HTMLDivElement, Props>((_, ref) => {
    const [isTyping, setIsTyping] = useState(false);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [prompts, setPrompts] = useState<ProductData[]>([]);

    useEffect(() => {
        const setProductsData = async () => {
            const data = await getProductsData();
            setProducts(data);
        };

        setProductsData();
    }, []);

    const getMatchingProducts = (keyword: string) => {
        const matchingProducts = products.filter((product) =>
            product.title.toLowerCase().includes(keyword.trim().toLowerCase())
        );

        return matchingProducts;
    };

    const searchInput = useRef<HTMLInputElement>(null);

    const typingHandler = () => {
        if (searchInput.current?.value) {
            setIsTyping(true);
            const matchingProducts = getMatchingProducts(searchInput.current.value);
            if (matchingProducts.length === 0) {
                setIsTyping(false);
            }
            setPrompts(matchingProducts);
            return;
        }

        setIsTyping(false);
        setPrompts([]);
    };

    const router = useRouter();

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
            {isTyping && <SearchBarPrompts prompts={prompts} />}
        </>
    );
});

export default SearchBar;
