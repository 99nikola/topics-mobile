import React from "react";
import { registerRootComponent } from "expo";
import { ThemeProvider } from "@rneui/themed";
import theme from "./theme";
import Screens from "./components/templates/Screens";
import UserProvider from "./store/User";
import { StatusBar } from "react-native";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <StatusBar />
                <Screens />
            </UserProvider>
        </ThemeProvider>
    );
};

export default App;

registerRootComponent(App);
