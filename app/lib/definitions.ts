interface Reaction {
    likes: number;
    dislikes: number;
}

export interface Tweet {
    id: number;
    username: string;
    handle: string;
    avatar?: string;
    content: string;
    timestamp: string;
    reactions: Reaction;
    views: number;
    userid: number;
}

export interface DbResponse<T> {
    posts: T;
}

export interface Database {
    posts: Tweet[];
    users: string[]
}

export interface LikeProps {
    likeCount: number;
}

export interface TweetProps {
    tweet: Tweet;
    linkable?: boolean;
}