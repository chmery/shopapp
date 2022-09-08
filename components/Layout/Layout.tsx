import Header from "../UI/Header/Header";
import Newsletter from "../UI/Newsletter/Newsletter";
import styles from "./Layout.module.css";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main>{children}</main>
            <Newsletter />
        </div>
    );
};

export default Layout;
