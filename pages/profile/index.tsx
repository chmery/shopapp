import Loader from "../../components/UI/Loader/Loader";
import OrdersHistory from "../../components/Profile/OrdersHistory/OrdersHistory";
import UserData from "../../components/Profile/UserData/UserData";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const Profile = () => {
    const { authorizedUserId } = useContext(AuthContext);

    if (!authorizedUserId) return <Loader />;

    return (
        <>
            <UserData />
            <OrdersHistory />
        </>
    );
};

export default Profile;
