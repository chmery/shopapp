import React, { useState } from "react";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const subscribeHandler = () => {
        setEmail("");
    };

    const changeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <div className={styles.newsletter}>
            <h3>Subscribe to our newsletter</h3>
            <p>get a 10% discount on your next order!</p>
            <div className={styles.input}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={changeEmailHandler}
                    value={email}
                />
                <button className={"main-btn"} onClick={subscribeHandler}>
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
