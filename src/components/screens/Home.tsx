import { DrawerScreenProps } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import postService from "../../services/post";
import { Post } from "../../types/post";
import PostList from "../atoms/PostList";
import ViewMode from "../atoms/ViewMode";
import { DrawerParamList } from "../templates/MainLayout";

type HomeProps = DrawerScreenProps<DrawerParamList, "Home">;

const Home: React.FC<HomeProps> = (props) => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [loading, setLoading] = React.useState(true);

    useFocusEffect(
        React.useCallback(() => {
            postService
                .fetchAll()
                .then((posts) => {
                    setPosts(posts);
                    setLoading(false);
                })
                .catch(console.error);
        }, [])
    );

    const handleVote = React.useCallback(() => {
        postService
            .fetchAll()
            .then((posts) => {
                setPosts(posts);
            })
            .catch(console.error);
    }, []);

    if (loading) return null;

    if (posts.length === 0)
        return (
            <View style={styles.empty}>
                <Text h4>There are no posts :(</Text>
            </View>
        );

    return (
        <ViewMode style={styles.root}>
            <PostList posts={posts} navigation={props.navigation} onVote={handleVote} />
        </ViewMode>
    );
};

export default Home;

const styles = StyleSheet.create({
    root: {
        padding: 12,
        height: "100%"
    },
    empty: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50%"
    }
});
