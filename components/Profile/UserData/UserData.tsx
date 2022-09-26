import { auth } from "../../../firebase/config";
import { User } from "firebase/auth";
import { logOut } from "../../../firebase/helpers";
import styles from "./UserData.module.css";

const UserData = () => {
    const { email } = auth.currentUser as User;

    return (
        <div className={styles["user-data"]}>
            <span>Logged in as: {email}</span>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
};

export default UserData;
