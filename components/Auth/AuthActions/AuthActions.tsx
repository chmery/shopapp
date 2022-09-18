import Link from "next/link";
import styles from "./AuthActions.module.css";
import Spinner from "../../UI/Spinner/Spinner";

type Props = {
    isLoading: boolean;
    action: string;
};

const AuthActions = ({ isLoading, action }: Props) => {
    const BottomText = () => {
        const LoginPageText = (
            <p>
                Don't have an account? <Link href="/auth?action=signup">Sign Up</Link>
            </p>
        );

        const SignUpPageText = (
            <p>
                Already have an account? <Link href="/auth?action=login">Log In</Link>
            </p>
        );

        return action === "login" ? LoginPageText : SignUpPageText;
    };

    return (
        <>
            {!isLoading && (
                <button type="submit">{action === "login" ? "Log In" : "Sign Up"}</button>
            )}

            {isLoading && (
                <button type="submit" className={styles["loading-btn"]}>
                    {action === "login" ? "Loging In" : "Signing Up"} <Spinner />
                </button>
            )}
            {!isLoading && <BottomText />}
        </>
    );
};

export default AuthActions;
