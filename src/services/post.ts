import { API, generatePath } from "../config/api";
import axios from ".";
import { Post } from "../types/post";

function fetchAll() {
    return axios.get<{ posts: Post[] }>(API.POSTS).then((res) => res.data.posts);
}

function vote(slug: string, type: boolean) {
    return axios.put(generatePath(API.POST_VOTE, { slug, type: type.toString() }));
}
function create(post: Post) {
    return axios.post(API.POST, post);
}

function _delete(slug: string) {
    return axios.delete(generatePath(API.POST_SLUG, { slug }));
}

const postService = {
    fetchAll,
    vote,
    create,
    delete: _delete
};

export default postService;
