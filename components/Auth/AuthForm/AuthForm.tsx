import React, { useRef, useState, useEffect } from "react";
import styles from "./AuthForm.module.css";
import AuthActions from "../AuthActions/AuthActions";

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

    const title = action === "login" ? "Log in to your account" : "Create new account";

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
        setIsPasswordValid(true);
        setIsEmailValid(true);
    }, [action]);

    return (
        <form onSubmit={submitHandler} className={styles["auth-form"]} data-testid="auth-form">
            <h3 data-testid="auth-form-title">{title}</h3>
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
            <AuthActions isLoading={isLoading} action={action} />
        </form>
    );
};

export default AuthForm;
