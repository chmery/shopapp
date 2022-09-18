import Spinner from "../Spinner/Spinner";
import styles from "./RedirectingLoader.module.css";

const RedirectingLoader = () => {
    return (
        <div className={styles.loader}>
            <span>Redirecting</span>
            <Spinner />
        </div>
    );
};

export default RedirectingLoader;
