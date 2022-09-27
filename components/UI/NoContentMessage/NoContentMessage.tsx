import styles from "./NoContentMessage.module.css";
import Link from "next/link";

type Props = {
    title: string;
    message: string;
    link?: {
        href: string;
        text: string;
    };
};

const NoContentMessage = ({ title, message, link }: Props) => {
    return (
        <div className={styles["no-content"]}>
            <h3>{title}</h3>
            <p>{message}</p>
            {link && <Link href={link.href}>{link.text}</Link>}
        </div>
    );
};

export default NoContentMessage;
