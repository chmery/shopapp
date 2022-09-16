import Link from "next/link";
import React, { useRef, useState } from "react";
import styles from "./Login.module.css";

const Login = () => {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const enteredEmail = useRef<HTMLInputElement>(null!);
    const enteredPassword = useRef<HTMLInputElement>(null!);

    const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
            console.log("sending request");
        }
    };

    const focusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        const clickedInput = event.target;
        enteredEmail.current === clickedInput ? setIsEmailValid(true) : setIsPasswordValid(true);
    };

    return (
        <form onSubmit={loginHandler} className={styles["login-form"]}>
            <h3>Log in to your account</h3>
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
            <button type="submit">Log In</button>
            <p>
                Don't have an account? <Link href="/auth/signup">Sign Up</Link>
            </p>
        </form>
    );
};

export default Login;
