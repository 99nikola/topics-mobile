import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Screens";
import { createDrawerNavigator } from "@react-navigation/drawer";
import useHeaderOptions, { NAV_TYPE } from "../../hooks/useHeaderOptions";
import Home from "../screens/Home";
import Topics from "../screens/Topics";
import Topic from "../screens/Topic";
import Post from "../screens/Post";

export type DrawerParamList = {
    Home: undefined;
    Topic: { name: string };
    Topics: undefined;
    Post: { slug: string };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

type MainLayoutProps = NativeStackScreenProps<RootStackParamList, "MainLayout">;

const MainLayout: React.FC<MainLayoutProps> = () => {
    const options = useHeaderOptions({
        type: NAV_TYPE.DRAWER
    });

    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={options}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Topics" component={Topics} />
            <Drawer.Screen name="Topic" component={Topic} options={hidden} />
            <Drawer.Screen name="Post" component={Post} options={hidden} />
        </Drawer.Navigator>
    );
};

export default MainLayout;

const hidden = {
    drawerItemStyle: {
        height: 0
    }
};
