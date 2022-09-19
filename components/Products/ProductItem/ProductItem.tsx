import Image from "next/future/image";
import { useRouter } from "next/router";
import styles from "./ProductItem.module.css";

type Props = {
    productData: ProductData;
};

const ProductItem = ({ productData }: Props) => {
    const title = `${productData.title.slice(0, 40)}...`;
    const price = `$${productData.price}`;

    const router = useRouter();

    return (
        <div
            className={styles.product}
            onClick={() => router.push(`/product?id=${productData.id}`)}
        >
            <div className={styles["product-image"]}>
                <Image src={productData.image} alt={productData.title} fill />
            </div>
            <h3>{title}</h3>
            <span>{price}</span>
        </div>
    );
};

export default ProductItem;
