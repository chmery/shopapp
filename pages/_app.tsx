import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store/store";
import AuthContextProvider from "../store/auth-context";
//import { auth } from "../firebase/config";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/config";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    //const [kongo, setKongo] = useState();
    //const auth = getAuth(app);
    //console.log(auth);

    /*     useEffect(() => {
        console.log(auth.currentUser);
    }, [auth.currentUser]); */
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
