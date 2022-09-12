import { capitalize } from "../../helpers/helpers";
import Link from "next/link";
import ProductsList from "../ProductsList/ProductsList";
import styles from "./CategoryShowcase.module.css";

type Props = {
    products: ProductData[];
    category: string;
};

const CategoryShowcase = ({ products, category }: Props) => {
    let productsNum = 0;
    const categoryCapitalized = capitalize(category);

    const categoryProducts = products.filter((product) => {
        if (product.category === category && productsNum < 2) {
            productsNum++;
            return true;
        }
    });

    return (
        <>
            <div className={styles.category}>
                <h3>{categoryCapitalized}</h3>
                <Link href={`/${category}`}>See all</Link>
            </div>
            <ProductsList products={categoryProducts} />
        </>
    );
};

export default CategoryShowcase;
