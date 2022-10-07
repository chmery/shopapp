import styles from "./ProductsList.module.css";
import ProductItem from "../ProductItem/ProductItem";

type Props = {
    products: ProductData[] | FavouriteItem[];
};

const ProductsList = ({ products }: Props) => {
    return (
        <div className={styles.products}>
            {products.map((product) => (
                <ProductItem productData={product} key={product.id} />
            ))}
        </div>
    );
};

export default ProductsList;
