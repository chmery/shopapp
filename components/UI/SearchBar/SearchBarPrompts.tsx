import styles from "./SearchBarPrompts.module.css";
import { capitalize } from "../../../helpers/helpers";
import { useRouter } from "next/router";
import React from "react";

type Props = {
    prompts: ProductData[];
};

const SearchBarPrompts = React.forwardRef<HTMLDivElement, Props>(({ prompts }, ref) => {
    let promptsNum = 0;
    const router = useRouter();

    return (
        <div className={styles.wrapper}>
            <div className={styles.prompts} ref={ref}>
                {prompts.map((product) => {
                    const title = `${product.title.slice(0, 50)}...`;
                    const category = capitalize(product.category);

                    promptsNum++;
                    if (promptsNum > 8) return;

                    return (
                        <div
                            className={styles.prompt}
                            onClick={() => router.push(`/product?id=${product.id}`)}
                            key={product.id}
                        >
                            <h3>{title}</h3>
                            <span>{category}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

SearchBarPrompts.displayName = "SearchBarPrompts";
export default SearchBarPrompts;
