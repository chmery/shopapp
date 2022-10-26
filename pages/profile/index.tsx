import Loader from "../../components/UI/Loader/Loader";
import OrdersHistory from "../../components/Profile/OrdersHistory/OrdersHistory";
import UserData from "../../components/Profile/UserData/UserData";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const Profile = () => {
    const { authorizedUserId } = useContext(AuthContext);

    return (
        <>
            {!authorizedUserId && <Loader />}
            {authorizedUserId && <UserData />}
            {authorizedUserId && <OrdersHistory />}
        </>
    );
};

export default Profile;
