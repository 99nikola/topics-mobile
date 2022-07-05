import React from "react";
import { useTheme } from "@rneui/themed";
import HeaderRight from "../components/templates/HeaderRight";

export enum NAV_TYPE {
    STACK = "stack",
    DRAWER = "drawer"
}

interface Props {
    type: NAV_TYPE;
}

const useHeaderOptions = (props: Props): any => {
    const { theme } = useTheme();

    const stackOptions = React.useCallback(
        (params: { navigation: any; route: any }) => ({
            headerRight: () => <HeaderRight navigate={params.navigation} route={params.route} />,
            headerStyle: {
                backgroundColor:
                    theme.mode === "dark"
                        ? theme.colors.backgroundSecondary
                        : theme.colors.background
            },
            headerTintColor: theme.colors.text
        }),
        [theme]
    );

    const drawerOptions = React.useCallback(
        (params: { navigation: any; route: any }) => ({
            headerRight: () => <HeaderRight navigate={params.navigation} route={params.route} />,
            headerStyle: {
                backgroundColor:
                    theme.mode === "dark"
                        ? theme.colors.backgroundSecondary
                        : theme.colors.background
            },
            headerTintColor: theme.colors.text,
            drawerContentStyle: {
                backgroundColor: theme.mode === "dark" ? theme.colors.background : undefined
            },
            drawerActiveBackgroundColor: theme.mode === "dark" ? theme.colors.primary : undefined,
            drawerInactiveBackgroundColor: theme.colors.backgroundSecondary,
            drawerActiveTintColor: theme.colors.text,
            drawerInactiveTintColor: theme.colors.text,
            drawerType: "slide"
        }),
        [theme]
    );
    if (props.type === NAV_TYPE.DRAWER) return drawerOptions;
    return stackOptions;
};

export default useHeaderOptions;
