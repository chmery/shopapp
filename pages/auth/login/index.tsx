import Link from "next/link";
import React, { useRef } from "react";
import styles from "./Login.module.css";

const Login = () => {
    const enteredEmail = useRef<HTMLInputElement>(null!);
    const enteredPassword = useRef<HTMLInputElement>(null!);

    const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = enteredEmail.current.value;
        const password = enteredPassword.current.value;
        console.log(`logging to ${email}`);
    };

    return (
        <form onSubmit={loginHandler} className={styles["login-form"]}>
            <h3>Log in to your account</h3>
            <input ref={enteredEmail} type="email" placeholder="E-mail" />
            <input ref={enteredPassword} type="password" placeholder="Password" />
            <button type="submit">Log In</button>
            <p>
                Don't have an account? <Link href="/auth/signup">Sign Up</Link>
            </p>
        </form>
    );
};

export default Login;
