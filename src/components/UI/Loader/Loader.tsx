import Spinner from "../Spinner/Spinner";
import styles from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <Spinner />
        </div>
    );
};

export default Loader;
