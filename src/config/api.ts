export enum API {
    SIGN_IN = "/api/sign-in",
    SIGN_UP = "/api/sign-up",
    TOKEN = "/api/token",
    POSTS = "/api/posts",
    POST_VOTE = "/api/post/:slug/:type",
    TOPICS = "/api/topics",
    TOPIC_JOIN = "/api/topic/join/:name",
    TOPIC_LEAVE = "/api/topic/leave/:name",
    TOPIC = "/api/topic/:name",
    TOPIC_CREATE = "/api/topic",
    POST = "/api/post",
    POST_SLUG = "/api/post/:slug"
}

export const API_URL = "http://192.168.1.65:3030";

export function generatePath(route: API, params: Record<string, string>) {
    switch (route) {
        case API.POST_VOTE:
            return `/api/post/${params.slug}/${params.type}`;

        case API.TOPIC_JOIN:
            return `/api/topic/join/${params.name}`;

        case API.TOPIC_LEAVE:
            return `/api/topic/leave/${params.name}`;

        case API.TOPIC:
            return `/api/topic/${params.name}`;

        case API.POST_SLUG:
            return `/api/topic/${params.slug}`;

        default:
            return route;
    }
}
