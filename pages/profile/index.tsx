import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../store/auth-context";
import Loader from "../../components/UI/Loader/Loader";
import OrdersHistory from "../../components/Profile/OrdersHistory/OrdersHistory";
import UserData from "../../components/Profile/UserData/UserData";

const Profile = () => {
    const { isLoggedIn } = useContext(AuthContext) as AuthContext;

    const router = useRouter();

    if (!isLoggedIn) {
        router.push("/auth?action=login");
        return <Loader />;
    }

    return (
        <>
            <UserData />
            <OrdersHistory />
        </>
    );
};

export default Profile;
