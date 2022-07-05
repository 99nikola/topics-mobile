import { DrawerScreenProps } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import topicService from "../../services/topic";
import { Topic } from "../../types/post";
import ViewMode from "../atoms/ViewMode";
import TopicItem from "../molecules/TopicItem";
import ModalCreateTopic from "../organisms/ModalCreateTopic";
import { DrawerParamList } from "../templates/MainLayout";

type TopicProps = DrawerScreenProps<DrawerParamList, "Topics">;

const Topics: React.FC<TopicProps> = (props) => {
    const [topics, setTopics] = React.useState<Topic[]>([]);
    const [loading, setLoading] = React.useState(true);

    const handleUpdate = React.useCallback(() => {
        topicService
            .fetchAll()
            .then((topics) => {
                setTopics(topics);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            handleUpdate();
        }, [handleUpdate])
    );

    if (loading) return null;

    if (topics.length === 0)
        return (
            <ViewMode>
                <Text h4>There are no posts :(</Text>
            </ViewMode>
        );

    return (
        <ScrollView>
            <ViewMode style={{ minHeight: "100%" }}>
                <ModalCreateTopic onCreate={handleUpdate} />

                {topics.map((topic) => (
                    <TopicItem key={topic.name} topic={topic} navigation={props.navigation} />
                ))}
            </ViewMode>
        </ScrollView>
    );
};

export default Topics;
