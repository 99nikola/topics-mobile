/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainLayout from "./MainLayout";
import SignIn from "../screens/SignIn";
import useHeaderOptions, { NAV_TYPE } from "../../hooks/useHeaderOptions";
import SignUp from "../screens/SignUp";

export type RootStackParamList = {
    MainLayout: undefined;
    SignIn: undefined;
    SignUp: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const noHeader = {
    header: () => null
};

const Screens: React.FC = () => {
    const options = useHeaderOptions({
        type: NAV_TYPE.STACK
    });

    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="SignIn">
                <RootStack.Screen name="MainLayout" component={MainLayout} options={noHeader} />
                <RootStack.Screen name="SignIn" component={SignIn} options={options} />
                <RootStack.Screen name="SignUp" component={SignUp} options={options} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default Screens;
