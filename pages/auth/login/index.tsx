import AuthForm from "../../../components/Auth/AuthForm";

const Login = () => {
    const authHandler = () => {
        console.log("auth");
    };

    return <AuthForm onAuth={authHandler} action={"login"} />;
};

export default Login;
