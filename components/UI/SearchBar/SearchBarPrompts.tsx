import styles from "./SearchBarPrompts.module.css";

type Props = {
    prompts: ProductData[];
};

const SearchBarPrompts = ({ prompts }: Props) => {
    let promptsNum = 0;

    return (
        <div className={styles.prompts}>
            {prompts.map((product) => {
                promptsNum++;
                if (promptsNum > 8) return;
                return <div>{product.title}</div>;
            })}
        </div>
    );
};

export default SearchBarPrompts;
