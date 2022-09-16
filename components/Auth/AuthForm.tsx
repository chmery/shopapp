import Link from "next/link";
import React, { useRef, useState } from "react";
import styles from "./AuthForm.module.css";

type Props = {
    onAuth: () => void;
    action: string;
};

const AuthForm = ({ onAuth, action }: Props) => {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const enteredEmail = useRef<HTMLInputElement>(null!);
    const enteredPassword = useRef<HTMLInputElement>(null!);

    const title = action === "login" ? "Log in to your account" : "Create new account";

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

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = enteredEmail.current.value.trim();
        const password = enteredPassword.current.value.trim();

        if (!email) {
            setIsEmailValid(false);
        }

        if (!password) {
            setIsPasswordValid(false);
        }

        if (isEmailValid && isPasswordValid) {
            onAuth();
        }
    };

    const focusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        const clickedInput = event.target;
        enteredEmail.current === clickedInput ? setIsEmailValid(true) : setIsPasswordValid(true);
    };

    return (
        <form onSubmit={submitHandler} className={styles["auth-form"]}>
            <h3>{title}</h3>
            <div>
                <input
                    className={!isEmailValid ? styles.invalid : ""}
                    ref={enteredEmail}
                    type="email"
                    placeholder="E-mail"
                    onFocus={focusHandler}
                />
                {!isEmailValid && (
                    <p className={styles["invalid-message"]}>E-mail field can't be empty.</p>
                )}
            </div>

            <div>
                <input
                    className={!isPasswordValid ? styles.invalid : ""}
                    ref={enteredPassword}
                    type="password"
                    placeholder="Password"
                    onFocus={focusHandler}
                />
                {!isPasswordValid && (
                    <p className={styles["invalid-message"]}>Password field can't be empty.</p>
                )}
            </div>
            <button type="submit">{action === "login" ? "Log In" : "Sign Up"}</button>
            <BottomText />
        </form>
    );
};

export default AuthForm;
