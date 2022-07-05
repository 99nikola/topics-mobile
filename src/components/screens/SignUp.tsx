/* eslint-disable @typescript-eslint/no-misused-promises */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, Text } from "@rneui/themed";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StatusBar, StyleSheet } from "react-native";
import userService from "../../services/user";
import { useUser } from "../../store/User";
import { ISignUp, IUser } from "../../types/user";
import ViewMode from "../atoms/ViewMode";
import { RootStackParamList } from "../templates/Screens";

type SignUpProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

const rules = {
    required: "This field is required",
    minLength: 5
};

const SignUp: React.FC<SignUpProps> = (props) => {
    const form = useForm<ISignUp>();
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

    const onSignUp = React.useCallback(
        (creds: ISignUp) => {
            userService.signUp(creds).then(handleSignInData).catch(console.error);
        },
        [handleSignInData]
    );

    const onError = React.useCallback((data) => {
        console.log(data);
    }, []);

    const Controlled: React.FC<{ name: keyof ISignUp; label: string; secure?: boolean }> =
        React.useCallback(
            ({ name, label, secure }) => (
                <Controller
                    name={name}
                    control={form.control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                        <Input
                            placeholder={label}
                            onChangeText={field.onChange}
                            value={field.value?.toString()}
                            secureTextEntry={secure}
                            errorMessage={fieldState.error?.message}
                        />
                    )}
                />
            ),
            [form]
        );

    return (
        <ViewMode style={styles.container}>
            <Controlled name="username" label="Username" />
            <Controlled name="password" label="Password" secure />
            <Controlled name="confirmPassword" label="Confirm Password" secure />
            <Controlled name="email" label="Email" />
            <Controlled name="firstName" label="First Name" />
            <Controlled name="lastName" label="Last Name" />
            <Button
                title="Sign Up"
                onPress={form.handleSubmit(onSignUp, onError)}
                size="lg"
                type="outline"
            />
        </ViewMode>
    );
};

export default SignUp;

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
