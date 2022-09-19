import { auth } from "../../../firebase/config";
import { User } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../../store/auth-context";
import styles from "./UserData.module.css";

const UserData = () => {
    const { email } = auth.currentUser as User;
    const { logOut } = useContext(AuthContext) as AuthContext;

    return (
        <div className={styles["user-data"]}>
            <span>Logged in as: {email}</span>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
};

export default UserData;
