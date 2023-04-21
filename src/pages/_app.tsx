import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {UserContext} from "@/lib/context";
import {useUserData} from "@/lib/hooks";
import {Provider} from "react-redux";
import store from "@/slices";
import "@fontsource/atkinson-hyperlegible";
import "@fontsource/jost";
import Navigation from "@/components/navigation";

const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: "#f2ede7",
            },
        }),
    },
    fonts: {
        body: `'Jost', sans-serif`,
        p: 'Atkinson Hyperlegible, sans-serif',
    },
});

export default function App({Component, pageProps}: AppProps) {
    const userData = useUserData();

    return (
        <UserContext.Provider value={userData}>
            <ChakraProvider theme={theme}>
                <Provider store={store}>
                <Navigation/>
                <Component {...pageProps} />
                </Provider>
            </ChakraProvider>
        </UserContext.Provider>
    );
}
