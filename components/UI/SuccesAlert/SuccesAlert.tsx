import { Alert } from "@mui/material";

type Props = {
    onClose: () => void;
};

const SuccesAlert = ({ onClose }: Props) => {
    return (
        <Alert severity="success" onClose={() => onClose()}>
            Your order has been successfully placed!
        </Alert>
    );
};

export default SuccesAlert;
