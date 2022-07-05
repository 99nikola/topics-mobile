export interface Post {
    id: number;
    username: string;
    slug: string;
    title: string;
    content: string;
    upVotes: number;
    downVotes: number;
    dateCreated: string;
    topicName: string;
}

export interface Topic {
    id: number;
    name: string;
    title: string;
    coverImg: string;
    avatarImg: string;
    description: string;
    posts: Post[];
    owner: string;
    moderators: string[];
}
