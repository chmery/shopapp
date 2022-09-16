import AuthForm from "../../../components/Auth/AuthForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import { useState } from "react";

const SignUp = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const authHandler = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            if (user) {
                router.push("/");
            }
            setIsLoading(false);
        } catch (error) {
            const errorMessage = (error as Error).message;
            setError(errorMessage);
        }
    };

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            <AuthForm onAuth={authHandler} action={"signup"} isLoading={isLoading} />
        </>
    );
};

export default SignUp;
