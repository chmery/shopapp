import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import styles from "./AuthForm.module.css";
import Spinner from "../UI/Spinner/Spinner";
import { useRouter } from "next/router";

type Props = {
    onAuth: (email: string, password: string) => void;
    action: string;
    isLoading: boolean;
};

const AuthForm = ({ onAuth, action, isLoading }: Props) => {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const enteredEmail = useRef<HTMLInputElement>(null!);
    const enteredPassword = useRef<HTMLInputElement>(null!);

    const router = useRouter();

    const title = action === "login" ? "Log in to your account" : "Create new account";

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

    const areInputsValid = (email: string, password: string) => {
        const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
        const isEmailValid = emailRegex.test(email);

        if (!isEmailValid) {
            setIsEmailValid(false);
            const error = "Enter correct e-mail address.";
            setEmailError(error);
        }

        if (password.length < 6) {
            const error = "Password should be at least 6 characters long.";
            setIsPasswordValid(false);
            setPasswordError(error);
        }

        return isEmailValid && password.length >= 6 ? true : false;
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = enteredEmail.current.value.trim();
        const password = enteredPassword.current.value.trim();

        if (areInputsValid(email, password)) {
            onAuth(email, password);
        }
    };

    const focusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        const clickedInput = event.target;
        enteredEmail.current === clickedInput ? setIsEmailValid(true) : setIsPasswordValid(true);
    };

    useEffect(() => {
        const setInitialState = () => {
            setIsPasswordValid(true);
            setIsEmailValid(true);
        };

        router.events.on("routeChangeStart", setInitialState);
        return () => router.events.off("routeChangeStart", setInitialState);
    }, []);

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
                {!isEmailValid && <p className={styles["invalid-message"]}>{emailError}</p>}
            </div>

            <div>
                <input
                    className={!isPasswordValid ? styles.invalid : ""}
                    ref={enteredPassword}
                    type="password"
                    placeholder="Password"
                    onFocus={focusHandler}
                />
                {!isPasswordValid && <p className={styles["invalid-message"]}>{passwordError}</p>}
            </div>
            {!isLoading && (
                <button type="submit">{action === "login" ? "Log In" : "Sign Up"}</button>
            )}

            {isLoading && (
                <button type="submit" className={styles["loading-btn"]}>
                    {action === "login" ? "Loging In" : "Signing Up"} <Spinner />
                </button>
            )}
            {!isLoading && <BottomText />}
        </form>
    );
};

export default AuthForm;
