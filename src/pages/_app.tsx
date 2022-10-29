import "../styles/globals.css";
import "../styles/buttons.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store/store";
import AuthContextProvider from "../store/auth-context";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <AuthContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthContextProvider>
        </Provider>
    );
}

export default MyApp;
