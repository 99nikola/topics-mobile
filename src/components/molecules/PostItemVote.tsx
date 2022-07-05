import { Icon, Text, useTheme } from "@rneui/themed";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import postService from "../../services/post";

export type VoteHandler = {
    onVote: () => void;
};

interface Props extends VoteHandler {
    id: number;
    slug: string;
    upVotes: number;
    downVotes: number;
}

const PostItemVote: React.FC<Props> = (props) => {
    const { theme } = useTheme();

    const handleUpVote = React.useCallback(() => {
        postService.vote(props.slug, true).then(props.onVote).catch(console.error);
    }, [props]);

    const handleDownVote = React.useCallback(() => {
        postService.vote(props.slug, false).then(props.onVote).catch(console.error);
    }, [props]);

    return (
        <View style={styles.vote}>
            <Pressable
                onPress={handleUpVote}
                style={{
                    marginRight: 6
                }}
            >
                <Icon
                    name="arrow-circle-up"
                    type="font-awesome-5"
                    color={theme.colors.primary}
                    size={32}
                />
            </Pressable>
            <Text
                style={{
                    fontSize: 20
                }}
            >
                {props.upVotes - props.downVotes}
            </Text>
            <Pressable
                onPress={handleDownVote}
                style={{
                    marginLeft: 6
                }}
            >
                <Icon
                    name="arrow-circle-down"
                    type="font-awesome-5"
                    color={theme.colors.primary}
                    size={32}
                />
            </Pressable>
        </View>
    );
};

export default PostItemVote;

const styles = StyleSheet.create({
    vote: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 16
    }
});
