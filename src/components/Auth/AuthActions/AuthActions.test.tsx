import { render, screen } from "@testing-library/react";
import AuthActions from "./AuthActions";
import "@testing-library/jest-dom";

describe("Auth actions", () => {
    it("should disable button when is loading", () => {
        render(<AuthActions isLoading={true} action={"login"} />);
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should render sign up message when action is equal to login", () => {
        render(<AuthActions isLoading={false} action={"login"} />);
        expect(screen.getByText("Don't have an account?")).toBeVisible();
    });

    it("should render log in message when action is equal to signup", () => {
        render(<AuthActions isLoading={false} action={"signup"} />);
        expect(screen.getByText("Already have an account?")).toBeVisible();
    });
});
