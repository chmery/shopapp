import AuthForm from "../../../components/Auth/AuthForm";

const SignUp = () => {
    const authHandler = () => {
        console.log("auth");
    };

    return <AuthForm onAuth={authHandler} action={"signup"} />;
};

export default SignUp;
