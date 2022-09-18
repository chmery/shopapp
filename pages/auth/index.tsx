import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const LogIn = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const authContext = useContext(AuthContext);

    const router = useRouter();
    const { action } = router.query;

    const authHandler = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            action === "login"
                ? await authContext!.login(email, password)
                : await authContext!.signUp(email, password);

            if (authContext?.currentUser) {
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
