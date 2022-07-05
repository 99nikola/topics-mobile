import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Avatar, Card, Text, useTheme } from "@rneui/themed";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Topic } from "../../types/post";
import { DrawerParamList } from "../templates/MainLayout";

interface TopicItemProps {
    topic: Topic;
    navigation: DrawerNavigationProp<DrawerParamList, "Topics", undefined>;
}

const TopicItem: React.FC<TopicItemProps> = (props) => {
    const { theme } = useTheme();

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

    const handleNavigateTopic = React.useCallback(() => {
        props.navigation.navigate("Topic", {
            name: props.topic.name
        });
    }, [props.navigation, props.topic]);

    return (
        <Pressable onPress={handleNavigateTopic}>
            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Image
                    source={{
                        uri: props.topic.coverImg
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        alignSelf: "center",
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
                <View>
                    <View style={styles.post}>
                        <View style={styles.body}>
                            <Text>OK</Text>
                        </View>
                    </View>
                </View>
            </Card>
        </Pressable>
    );
};

export default TopicItem;
