import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store/store";
import AuthProvider from "../store/auth-context";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </Provider>
    );
}

export default MyApp;
