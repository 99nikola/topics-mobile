import { DrawerNavigationProp } from "@react-navigation/drawer";
import React from "react";
import { FlatList } from "react-native";
import { Post } from "../../types/post";
import { VoteHandler } from "../molecules/PostItemVote";
import PostListItem from "../molecules/PostListItem";
import { DrawerParamList } from "../templates/MainLayout";

interface PostListProps extends VoteHandler {
    posts: Post[];
    navigation: DrawerNavigationProp<DrawerParamList>;
}

const PostList: React.FC<PostListProps> = (props) => {
    return (
        <FlatList
            data={props.posts}
            renderItem={({ item }) => (
                <PostListItem post={item} navigation={props.navigation} onVote={props.onVote} />
            )}
        />
    );
};

export default PostList;
