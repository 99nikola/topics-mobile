/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Button, Icon, useThemeMode } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import userService from "../../services/user";
import { DEFAULT_STATE, useUser } from "../../store/User";

const HeaderRight: React.FC<{ navigate: any; route: any }> = (props) => {
    const { mode, setMode } = useThemeMode();
    const [user, setUser] = useUser();

    const handleSignOut = React.useCallback(() => {
        userService
            .signOut()
            .then(() => {
                setUser(DEFAULT_STATE);
                props.navigate.replace("SignIn");
            })
            .catch(console.error);
    }, [props.navigate, setUser]);

    const handleChangeMode = React.useCallback(() => {
        setMode(mode === "dark" ? "light" : "dark");
    }, [mode, setMode]);

    return (
        <View style={styles.root}>
            {user.isActive ? (
                <Button onPress={handleSignOut} type="solid">
                    Sign Out
                </Button>
            ) : props.route.name === "SignIn" ? (
                <Button onPress={() => props.navigate.navigate("SignUp")}>Sign Up</Button>
            ) : (
                <Button onPress={() => props.navigate.navigate("SignIn")}>Sign In</Button>
            )}
            <Button onPress={handleChangeMode} type="clear">
                <Icon name="adjust" type="font-awesome-5" size={32} />
            </Button>
        </View>
    );
};

export default HeaderRight;

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        alignItems: "center",
        gap: 18
    }
});
