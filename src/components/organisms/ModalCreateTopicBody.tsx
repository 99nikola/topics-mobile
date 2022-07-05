import { Input } from "@rneui/themed";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Topic } from "../../types/post";

interface Props {
    form: UseFormReturn<Topic, object>;
}

const rules = { required: "This field is requried" };

const ModalCreateTopicBody: React.FC<Props> = (props) => {
    const Controlled: React.FC<{ name: keyof Topic; label: string }> = React.useCallback(
        ({ name, label }) => (
            <Controller
                name={name}
                control={props.form.control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <Input
                        placeholder={label}
                        onChangeText={field.onChange}
                        value={field.value?.toString()}
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />
        ),
        [props]
    );
    return (
        <View style={styles.width}>
            <Controlled name="name" label="Name" />
            <Controlled name="title" label="Title" />
            <Controlled name="description" label="Description" />
            <Controlled name="avatarImg" label="Avatar Image" />
            <Controlled name="coverImg" label="Cover Image" />
        </View>
    );
};

export default ModalCreateTopicBody;

const styles = StyleSheet.create({
    width: {
        width: "100%"
    }
});
