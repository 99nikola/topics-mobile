import { DrawerScreenProps } from "@react-navigation/drawer";
import { Text } from "@rneui/themed";
import React from "react";
import { DrawerParamList } from "../templates/MainLayout";

type PostProps = DrawerScreenProps<DrawerParamList, "Post">;

const Post: React.FC<PostProps> = () => {
    return <Text>Post</Text>;
};

export default Post;
