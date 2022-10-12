import { createContext } from "react";

export const MockAuthContext = createContext<{ isLoggedIn: boolean }>({ isLoggedIn: false });
