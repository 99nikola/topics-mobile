import { DrawerScreenProps } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import topicService from "../../services/topic";
import { Topic as ITopic } from "../../types/post";
import PostList from "../atoms/PostList";
import ViewMode from "../atoms/ViewMode";
import ModalCreatePost from "../organisms/ModalCreatePost";
import TopicInfo from "../organisms/TopicInfo";
import { DrawerParamList } from "../templates/MainLayout";

type TopicProps = DrawerScreenProps<DrawerParamList, "Topic">;

const Topic: React.FC<TopicProps> = (props) => {
    const [topic, setTopic] = React.useState<ITopic>();
    const [isMember, setIsMember] = React.useState(false);
    const [vote, setVote] = React.useState<"UP" | "DOWN">();

    const handleUpdate = React.useCallback(() => {
        topicService
            .fetch(props.route.params.name)
            .then((data) => {
                setTopic(data.topic);
                setIsMember(data.isMember);
                setVote(data.vote);
            })
            .catch(console.error);
    }, [props.route]);

    useFocusEffect(
        React.useCallback(() => {
            handleUpdate();
        }, [handleUpdate])
    );

    if (topic === undefined) return null;

    return (
        <ViewMode
            style={{
                height: "100%"
            }}
        >
            <TopicInfo
                topic={topic}
                isMember={isMember}
                vote={vote}
                onUpdate={handleUpdate}
                navigation={props.navigation}
            />
            <ModalCreatePost onCreate={handleUpdate} topicName={topic.name} />
            <PostList posts={topic.posts} navigation={props.navigation} onVote={handleUpdate} />
        </ViewMode>
    );
};

export default Topic;
