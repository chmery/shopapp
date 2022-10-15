import Newsletter from "../Newsletter/Newsletter";
import Link from "next/link";
import styles from "./Footer.module.css";
import Icons from "../Icons/Icons";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Newsletter />
            <div className={styles.navs}>
                <nav>
                    <h3>Categories</h3>
                    <Link href="/bestsellers">Bestsellers</Link>
                    <Link href="/electronics">Electronics</Link>
                    <Link href="/jewelery">Jewelery</Link>
                    <Link href="/men's clothing">Men</Link>
                    <Link href="/women's clothing">Women</Link>
                </nav>
                <nav>
                    <h3>Information</h3>
                    <Link href="/">About us</Link>
                    <Link href="/">Shipping</Link>
                    <Link href="/">Contact</Link>
                </nav>
            </div>
            <div className={styles.author}>
                <p>
                    Designed & built with <Icons.Heart /> by
                    <a href="https://github.com/chmery"> chmery</a>
                </p>
                <p>Based in Poland</p>
            </div>
        </footer>
    );
};

export default Footer;
