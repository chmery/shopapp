import { useContext } from "react";
import { auth } from "../../firebase/config";
import { useRouter } from "next/router";
import { AuthContext } from "../../store/auth-context";
import { User } from "firebase/auth";
import RedirectingLoader from "../../components/UI/RedirectingLoader/RedirectingLoader";

const Profile = () => {
    const { isLoggedIn, logOut } = useContext(AuthContext) as AuthContext;

    const router = useRouter();

    if (!isLoggedIn) {
        router.push("/auth?action=login");
        return <RedirectingLoader />;
    }

    const { email } = auth.currentUser as User;

    return (
        <>
            <h1>Currently logged as {email}</h1>
            <button onClick={logOut}>Log Out</button>
        </>
    );
};

export default Profile;
