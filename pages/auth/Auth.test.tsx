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
    it("renders log in form if url is equal to /auth/login", () => {
        render(<AuthForm action={"login"} onAuth={() => {}} isLoading={false} />);
        const formTitle = screen.getByTestId("auth-form-title");
        const actionBtn = screen.getByTestId("auth-btn");
        expect(formTitle && actionBtn).toHaveTextContent(/log in/i);
    });

    it("renders sign in form if url is equal to /auth/signup", () => {
        render(<AuthForm action={"signup"} onAuth={() => {}} isLoading={false} />);
        const formTitle = screen.getByTestId("auth-form-title");
        const actionBtn = screen.getByTestId("auth-btn");
        expect(formTitle && actionBtn).toHaveTextContent(/sign up/i);
    });

    it("doesn't render auth form if user is logged in", async () => {
        render(
            <MockAuthContext.Provider value={{ isLoggedIn: true }}>
                <AuthPage />
            </MockAuthContext.Provider>
        );

        const authForm = screen.queryByTestId("auth-form");
        expect(authForm).not.toBeInTheDocument();
    });
});
