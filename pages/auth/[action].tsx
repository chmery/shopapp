import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import Loader from "../../components/UI/Loader/Loader";
import { logIn, signUp } from "../../firebase/helpers";

const AuthPage = () => {
    const router = useRouter();

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { authorizedUserId } = useContext(AuthContext);
    const { action } = router.query;

    useEffect(() => {
        if (authorizedUserId) router.push("/");
    }, [authorizedUserId]);

    if (authorizedUserId) return <Loader />;

    const authHandler = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            action === "login" ? await logIn(email, password) : await signUp(email, password);
        } catch (error) {
            const errorMessage = (error as Error).message;
            setError(errorMessage);
        }
        setIsLoading(false);
    };

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            <AuthForm onAuth={authHandler} action={action as string} isLoading={isLoading} />
        </>
    );
};

export default AuthPage;
