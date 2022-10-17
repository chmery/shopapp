import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../store/auth-context";
import Loader from "../../components/UI/Loader/Loader";
import OrdersHistory from "../../components/Profile/OrdersHistory/OrdersHistory";
import UserData from "../../components/Profile/UserData/UserData";

const Profile = () => {
    const router = useRouter();
    const { authorizedUserId } = useContext(AuthContext);

    useEffect(() => {
        const storedUserId = localStorage.getItem("uid");
        if (!storedUserId) router.push("/auth/login");
        return;
    }, [authorizedUserId]);

    if (!authorizedUserId) return <Loader />;

    return (
        <>
            <UserData />
            <OrdersHistory />
        </>
    );
};

export default Profile;
