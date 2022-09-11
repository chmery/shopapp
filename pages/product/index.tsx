import styles from "./ProductPage.module.css";
import Image from "next/future/image";
import { HeartIcon } from "../../components/UI/Icons/Icons";
import { getProductsData } from "../../helpers/helpers";
import { useRouter } from "next/router";

type Props = {
    data: ProductData[];
};

const Product = ({ data }: Props) => {
    const router = useRouter();
    const { id } = router.query;

    const productIndex = data.findIndex((product) => product.id === Number(id));
    const product = data[productIndex];

    // temporary
    if (!product) return;

    return (
        <div className={styles.product}>
            <div className={styles["product-image"]}>
                <Image src={product.image} alt={product.title} fill />
            </div>
            <div className={styles.description}>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <div className={styles.rating}>
                    rating:
                    <span className={styles["rating-score"]}>{product.rating.rate}/5.0</span>
                    <span className={styles["rating-count"]}>{product.rating.count} votes</span>
                </div>
                <span className={styles.price}>${product.price}</span>
                <div className={styles.buttons}>
                    <button className={styles["cart-btn"]}>Add to Cart</button>
                    <button className={styles["fav-btn"]}>
                        Favourites <HeartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export const getStaticProps = async () => {
    const data = await getProductsData();

    return {
        props: {
            data,
        },
    };
};

export default Product;
