import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Avatar, Button, Card, Text, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import topicService from "../../services/topic";
import { useUser } from "../../store/User";
import { Topic } from "../../types/post";
import { DrawerParamList } from "../templates/MainLayout";

interface TopicProps {
    topic: Topic;
    isMember: boolean;
    vote: "UP" | "DOWN" | undefined;
    onUpdate: () => void;
    navigation: DrawerNavigationProp<DrawerParamList>;
}

const TopicInfo: React.FC<TopicProps> = (props) => {
    const { theme } = useTheme();
    const [user] = useUser();

    const styles = React.useMemo(
        () =>
            StyleSheet.create({
                container: {
                    backgroundColor: theme.colors.backgroundSecondary
                },
                wrapper: {
                    backgroundColor: theme.colors.backgroundSecondary
                },
                post: {
                    flex: 1
                },
                footer: {
                    flexDirection: "row",
                    justifyContent: "space-between"
                },
                body: {
                    padding: 12
                }
            }),
        [theme]
    );

    const handleJoin = React.useCallback(() => {
        topicService.join(props.topic.name).then(props.onUpdate).catch(console.error);
    }, [props]);

    const handleLeave = React.useCallback(() => {
        topicService.leave(props.topic.name).then(props.onUpdate).catch(console.error);
    }, [props]);

    const handleDelete = React.useCallback(() => {
        topicService
            .delete(props.topic.name)
            .then(() => {
                props.navigation.navigate("Topics");
            })
            .catch(console.error);
    }, [props]);

    return (
        <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
            <Card.Image
                source={{
                    uri: props.topic.coverImg
                }}
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        margin: 6
                    }}
                >
                    <Avatar
                        source={{
                            uri: props.topic.avatarImg
                        }}
                        rounded
                        size="medium"
                    />
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "flex-end"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                marginLeft: 12
                            }}
                        >
                            {props.topic.title}
                        </Text>
                        <Text
                            style={{
                                color: theme.colors.grey2
                            }}
                        >
                            @{props.topic.name}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    {props.isMember ? (
                        <Button color="warning" onPress={handleLeave}>
                            Leave
                        </Button>
                    ) : (
                        <Button color="primary" onPress={handleJoin}>
                            Join
                        </Button>
                    )}
                    {user.username === props.topic.owner && (
                        <Button color="error" onPress={handleDelete}>
                            Delete
                        </Button>
                    )}
                </View>
            </View>
            <View>
                <View style={styles.post}>
                    <View style={styles.body}>
                        <Text>OK</Text>
                    </View>
                </View>
            </View>
        </Card>
    );
};

export default TopicInfo;
