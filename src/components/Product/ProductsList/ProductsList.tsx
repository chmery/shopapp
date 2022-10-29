import styles from "./ProductsList.module.css";
import ProductItem from "../ProductItem/ProductItem";

type Props = {
    products: ProductData[] | FavouriteItem[];
    title?: string;
};

const ProductsList = ({ products, title }: Props) => {
    return (
        <>
            {title && <h3>{title}</h3>}
            <div className={styles.products}>
                {products.map((product) => (
                    <ProductItem productData={product} key={product.id} />
                ))}
            </div>
        </>
    );
};

export default ProductsList;
