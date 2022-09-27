import NoContentMessage from "../../components/UI/NoContentMessage/NoContentMessage";

const PageNotFound = () => {
    return (
        <>
            <NoContentMessage
                title={"Oops!"}
                message={"It looks like this page doesn't exist."}
                link={{ href: "/", text: "Go Home" }}
            />
            ;
        </>
    );
};

export default PageNotFound;
