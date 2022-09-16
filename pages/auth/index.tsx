import AuthForm from "../../components/Auth/AuthForm";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import { useState } from "react";

const LogIn = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { action } = router.query;

    const authHandler = async (email: string, password: string) => {
        try {
            setIsLoading(true);

            const res =
                action === "login"
                    ? await signInWithEmailAndPassword(auth, email, password)
                    : await createUserWithEmailAndPassword(auth, email, password);

            const user = res.user;
            if (user) {
                router.push("/");
            }
            setIsLoading(false);
        } catch (error) {
            const errorMessage = (error as Error).message;
            setError(errorMessage);
            setIsLoading(false);
        }
    };

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            <AuthForm onAuth={authHandler} action={action as string} isLoading={isLoading} />
        </>
    );
};

export default LogIn;
