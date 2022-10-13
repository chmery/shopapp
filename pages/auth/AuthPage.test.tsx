import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import AuthPage from "./[action]";
import { MockAuthContext } from "../../store/__mocks__/MockAuthContextProvider";
import { useContext } from "react";

jest.mock("./[action]", () => () => {
    const { isLoggedIn } = useContext(MockAuthContext);
    if (isLoggedIn) return;
    return <AuthForm action={"login"} onAuth={() => {}} isLoading={false} />;
});

describe("Auth page", () => {
    it("should NOT render auth form if user is logged in", () => {
        render(
            <MockAuthContext.Provider value={{ isLoggedIn: true }}>
                <AuthPage />
            </MockAuthContext.Provider>
        );

        const authForm = screen.queryByLabelText("auth-form");
        expect(authForm).not.toBeInTheDocument();
    });

    it("should render auth form if user is NOT logged in", () => {
        render(
            <MockAuthContext.Provider value={{ isLoggedIn: false }}>
                <AuthPage />
            </MockAuthContext.Provider>
        );

        const authForm = screen.getByLabelText("auth-form");
        expect(authForm).toBeVisible();
    });
});
