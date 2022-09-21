import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import Loader from "../../components/UI/Loader/Loader";

const AuthPage = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { logIn, signUp, isLoggedIn } = useContext(AuthContext) as AuthContext;

    const router = useRouter();
    const { action } = router.query;

    if (isLoggedIn) {
        router.push("/");
        return <Loader />;
    }

    const authHandler = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            action === "login" ? await logIn(email, password) : await signUp(email, password);

            if (isLoggedIn) {
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

export default AuthPage;
