import styles from "./SearchBarPrompts.module.css";
import { capitalize } from "../../../helpers/helpers";

type Props = {
    prompts: ProductData[];
};

const SearchBarPrompts = ({ prompts }: Props) => {
    let promptsNum = 0;

    return (
        <div className={styles.prompts}>
            {prompts.map((product) => {
                const title = `${product.title.slice(0, 50)}...`;
                const category = capitalize(product.category);

                promptsNum++;
                if (promptsNum > 8) return;

                return (
                    <div className={styles.prompt}>
                        <h3>{title}</h3>
                        <span>{category}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default SearchBarPrompts;
