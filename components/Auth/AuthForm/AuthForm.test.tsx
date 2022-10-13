import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthForm from "./AuthForm";

describe("Auth form", () => {
    it("should render log in form if url is equal to /auth/login", () => {
        render(<AuthForm action={"login"} onAuth={() => {}} isLoading={false} />);
        const formTitle = screen.getByText("Log in to your account");
        const actionBtn = screen.getByText("Log In");
        expect(formTitle && actionBtn).toBeVisible();
    });

    it("should render sign in form if url is equal to /auth/signup", () => {
        render(<AuthForm action={"signup"} onAuth={() => {}} isLoading={false} />);
        const formTitle = screen.getByText("Create new account");
        const actionBtn = screen.getByText("Sign Up");
        expect(formTitle && actionBtn).toBeVisible();
    });

    it("should NOT allow to submit empty form", () => {
        render(<AuthForm action={"login"} onAuth={() => {}} isLoading={false} />);
        const submitBtn = screen.getByRole("button");
        fireEvent.click(submitBtn);
        const invalidEmailMessage = screen.getByText("Enter correct e-mail address.");
        const invalidPasswordMessage = screen.getByText(
            "Password should be at least 6 characters long."
        );
        expect(invalidEmailMessage && invalidPasswordMessage).toBeVisible();
    });
});
