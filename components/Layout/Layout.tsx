import Footer from "../UI/Footer/Footer";
import Header from "../UI/Header/Header";
import styles from "./Layout.module.css";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
