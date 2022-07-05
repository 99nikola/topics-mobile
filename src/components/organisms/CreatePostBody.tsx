import { Input } from "@rneui/themed";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Post } from "../../types/post";

interface Props {
    form: UseFormReturn<Post, object>;
}

const rules = { required: "This field is requried" };

const CreatePostBody: React.FC<Props> = (props) => {
    const Controlled: React.FC<{ name: keyof Post; label: string }> = React.useCallback(
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
            <Controlled name="slug" label="Slug" />
            <Controlled name="title" label="Title" />
            <Controlled name="content" label="Content" />
        </View>
    );
};

export default CreatePostBody;

const styles = StyleSheet.create({
    width: {
        width: "100%"
    }
});
