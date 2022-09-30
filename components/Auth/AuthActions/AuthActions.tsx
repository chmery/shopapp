import Link from "next/link";
import Spinner from "../../UI/Spinner/Spinner";

type Props = {
    isLoading: boolean;
    action: string;
};

const AuthActions = ({ isLoading, action }: Props) => {
    const BottomText = () => {
        const LoginPageText = (
            <p>
                Don't have an account? <Link href="/auth/signup">Sign Up</Link>
            </p>
        );

        const SignUpPageText = (
            <p>
                Already have an account? <Link href="/auth/login">Log In</Link>
            </p>
        );

        return action === "login" ? LoginPageText : SignUpPageText;
    };

    return (
        <>
            {!isLoading && (
                <button className="main-btn" type="submit">
                    {action === "login" ? "Log In" : "Sign Up"}
                </button>
            )}

            {isLoading && (
                <button className="main-btn" type="submit" disabled>
                    {action === "login" ? "Logging In" : "Signing Up"} <Spinner />
                </button>
            )}
            {!isLoading && <BottomText />}
        </>
    );
};

export default AuthActions;
