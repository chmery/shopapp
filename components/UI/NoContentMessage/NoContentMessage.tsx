import styles from "./NoContentMessage.module.css";

type Props = {
    title: string;
    message: string;
};

const NoContentMessage = ({ title, message }: Props) => {
    return (
        <div className={styles["no-content"]}>
            <h3>{title}</h3>
            <p>{message}</p>
        </div>
    );
};

export default NoContentMessage;
