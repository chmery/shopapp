import { capitalize } from "../../helpers/helpers";
import Link from "next/link";
import ProductsList from "../ProductsList/ProductsList";
import styles from "./CategoryShowcase.module.css";
import { getProductsByCategory } from "../../helpers/helpers";

type Props = {
    products: ProductData[];
    category: string;
};

const CategoryShowcase = ({ products, category }: Props) => {
    const categoryCapitalized = capitalize(category);
    const categoryProducts = getProductsByCategory(products, category, 2);

    return (
        <div className={styles.category}>
            <div className={styles["category-title"]}>
                <h3>{categoryCapitalized}</h3>
                <Link href={`/${category}`}>See all</Link>
            </div>
            <ProductsList products={categoryProducts} />
        </div>
    );
};

export default CategoryShowcase;
