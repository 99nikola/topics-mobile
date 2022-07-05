import { API, generatePath } from "../config/api";
import axios from ".";
import { Topic } from "../types/post";

function fetchAll() {
    return axios.get<{ topics: Topic[] }>(API.TOPICS).then((res) => res.data.topics);
}

function fetch(name: string) {
    return axios
        .get<{ topic: Topic; isMember: boolean; vote: "UP" | "DOWN" }>(
            generatePath(API.TOPIC, {
                name
            })
        )
        .then((res) => res.data);
}

function join(name: string) {
    return axios.put(generatePath(API.TOPIC_JOIN, { name }));
}

function leave(name: string) {
    return axios.delete(generatePath(API.TOPIC_LEAVE, { name }));
}

function create(topic: Topic) {
    return axios.post(API.TOPIC_CREATE, topic);
}

function _delete(name: string) {
    return axios.delete(generatePath(API.TOPIC, { name }));
}

const topicService = {
    fetchAll,
    fetch,
    join,
    leave,
    create,
    delete: _delete
};

export default topicService;
