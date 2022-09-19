import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../store/auth-context";
import RedirectingLoader from "../../components/UI/RedirectingLoader/RedirectingLoader";
import OrdersHistory from "../../components/Profile/OrdersHistory";
import UserData from "../../components/Profile/UserData/UserData";

const Profile = () => {
    const { isLoggedIn } = useContext(AuthContext) as AuthContext;

    const router = useRouter();

    if (!isLoggedIn) {
        router.push("/auth?action=login");
        return <RedirectingLoader />;
    }

    return (
        <>
            <UserData />
            <OrdersHistory />
        </>
    );
};

export default Profile;
