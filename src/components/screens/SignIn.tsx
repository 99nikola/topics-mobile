/* eslint-disable @typescript-eslint/no-misused-promises */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import userService from "../../services/user";
import { useUser } from "../../store/User";
import { storage } from "../../storage";
import { ISignIn, IUser } from "../../types/user";
import ViewMode from "../atoms/ViewMode";
import { RootStackParamList } from "../templates/Screens";

type SignInProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

const rules = {
    required: "This field is required",
    minLength: 5
};

const SignIn: React.FC<SignInProps> = (props) => {
    const form = useForm<ISignIn>();
    const [, setUser] = useUser();

    const handleSignInData = React.useCallback(
        (user: IUser) => {
            setUser({
                ...user,
                isActive: true
            });
            props.navigation.replace("MainLayout");
        },
        [props.navigation, setUser]
    );

    React.useEffect(() => {
        storage
            .getToken()
            .then((token) => {
                if (token === null) return Promise.reject({ status: null });
                return userService.signInWithToken();
            })
            .then(handleSignInData)
            .catch((error) => {
                if (error?.status === null) return;
                console.error(error);
            });
    }, [handleSignInData]);

    const onSignIn = React.useCallback(
        (creds: ISignIn) => {
            userService.signIn(creds).then(handleSignInData).catch(console.error);
        },
        [handleSignInData]
    );

    const onError = React.useCallback((data) => {
        console.log(data);
    }, []);

    return (
        <ViewMode style={styles.container}>
            <StatusBar style="auto" />
            <Controller
                name="username"
                control={form.control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <Input
                        placeholder="Username"
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                name="password"
                control={form.control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <Input
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />
            <Button
                title="Sign In"
                onPress={form.handleSubmit(onSignIn, onError)}
                size="lg"
                type="outline"
            />
        </ViewMode>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    textInput: {
        width: "70%",
        padding: 8,
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12
    }
});
