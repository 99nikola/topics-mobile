/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Icon, Text, useTheme } from "@rneui/themed";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Modal, StyleSheet, View } from "react-native";
import topicService from "../../services/topic";
import { Topic } from "../../types/post";
import ModalCreateTopicBody from "./ModalCreateTopicBody";

interface Props {
    onCreate: () => void;
}

const ModalCreateTopic: React.FC<Props> = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const { theme } = useTheme();
    const form = useForm<Topic>();

    const handleHideModal = React.useCallback(() => setModalVisible(false), []);

    const onSubmit = React.useCallback(
        (topic: Topic) => {
            handleHideModal();
            topicService
                .create(topic)
                .then(() => props.onCreate())
                .catch(console.error);
        },
        [props, handleHideModal]
    );

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
                style={{
                    backgroundColor: theme.colors.background
                }}
            >
                <View style={styles.modalView}>
                    <ModalCreateTopicBody form={form} />
                    <View
                        style={{
                            flexDirection: "row"
                        }}
                    >
                        <Button onPress={handleHideModal} color="error">
                            Cancel
                        </Button>
                        <Button onPress={form.handleSubmit(onSubmit)} color="success">
                            Submit
                        </Button>
                    </View>
                </View>
            </Modal>
            <Button
                style={[styles.button, { backgroundColor: theme.colors.secondary }]}
                onPress={() => setModalVisible(true)}
                color="secondary"
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Icon name="plus-square" type="font-awesome-5" style={{ color: "black" }} />
                    <Text style={styles.textStyle}>Create Topic</Text>
                </View>
            </Button>
        </View>
    );
};

export default ModalCreateTopic;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 4,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: "50%"
    },
    button: {
        borderRadius: 4,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF"
    },
    buttonClose: {
        backgroundColor: "#2196F3"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: 8
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
