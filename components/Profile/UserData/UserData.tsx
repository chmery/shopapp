import { auth } from "../../../firebase/config";
import { User } from "firebase/auth";
import { logOut } from "../../../helpers/firebase";
import styles from "./UserData.module.css";
import { useRouter } from "next/router";

const UserData = () => {
    const router = useRouter();
    const { email } = auth.currentUser as User;

    const logOutHandler = () => {
        logOut();
        router.push("/auth/login");
    };

    return (
        <div className={styles["user-data"]}>
            <span>Logged in as: {email}</span>
            <button onClick={logOutHandler}>Log Out</button>
        </div>
    );
};

export default UserData;
