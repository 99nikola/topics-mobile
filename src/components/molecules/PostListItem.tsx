import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Card, Text, useTheme } from "@rneui/themed";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Post } from "../../types/post";
import { DrawerParamList } from "../templates/MainLayout";
import PostItemVote, { VoteHandler } from "./PostItemVote";

interface PostListItemProps extends VoteHandler {
    post: Post;
    navigation: DrawerNavigationProp<DrawerParamList>;
}

const PostListItem: React.FC<PostListItemProps> = (props) => {
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

    const handleOnUserPress = React.useCallback(() => {
        props.navigation.navigate("Topic", {
            name: props.post.topicName
        });
    }, [props.navigation, props.post]);

    const dateRef = React.useRef<Date>(new Date(props.post.dateCreated));

    return (
        <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
            <View
                style={{
                    alignItems: "center",
                    marginBottom: 12
                }}
            >
                <Card.Title
                    style={{
                        fontSize: 18
                    }}
                >
                    {props.post.title}
                </Card.Title>
                <Pressable onPress={handleOnUserPress}>
                    <Text
                        style={{
                            color: theme.colors.grey1
                        }}
                    >
                        @{props.post.topicName}
                    </Text>
                </Pressable>
            </View>
            <Card.Divider />
            <View>
                <View style={styles.post}>
                    <View style={styles.body}>
                        <Text>{props.post.content}</Text>
                    </View>
                </View>
            </View>
            <Card.Divider />
            <View style={styles.footer}>
                <PostItemVote
                    id={props.post.id}
                    slug={props.post.slug}
                    upVotes={props.post.upVotes}
                    downVotes={props.post.downVotes}
                    onVote={props.onVote}
                />
                <Text>Comments</Text>
                <View>
                    <Text>{dateRef.current.toLocaleDateString()}</Text>
                </View>
            </View>
        </Card>
    );
};

export default PostListItem;
