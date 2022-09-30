import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import styles from "./WriteReview.module.css";

type Props = {
    onPublish: (ratingValue: number, inputValue: string) => void;
    isReviewSending: boolean;
};

const WriteReview = ({ onPublish, isReviewSending }: Props) => {
    const [ratingValue, setRatingValue] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [isValid, setIsValid] = useState(false);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const enteredText = event.target.value;
        if (enteredText.length > 200) return;
        setInputValue(enteredText);
    };

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isValid) return;
        onPublish(ratingValue!, inputValue);
    };

    useEffect(() => {
        inputValue.trim().length && ratingValue ? setIsValid(true) : setIsValid(false);
    }, [inputValue, ratingValue]);

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <h3>Write a review</h3>
            <Rating
                name={"review-rating"}
                value={ratingValue}
                onChange={(_, newValue) => setRatingValue(newValue!)}
                precision={0.5}
            />
            <textarea value={inputValue} onChange={inputChangeHandler} />
            <div>
                {!isReviewSending && (
                    <button className="main-btn" type="submit" disabled={isValid ? false : true}>
                        Publish
                    </button>
                )}

                {isReviewSending && (
                    <button className="main-btn" disabled>
                        Publishing <Spinner />
                    </button>
                )}
            </div>
        </form>
    );
};

export default WriteReview;
