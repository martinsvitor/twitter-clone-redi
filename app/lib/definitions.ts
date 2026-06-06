// UI-specific types (what the API returns after joining/aggregating)
export interface ReactionCounts {
    likes: number;
    dislikes: number;
}

export interface TweetWithAuthor {
    id: string;
    username: string;
    handle: string;
    avatar: string;
    content: string;
    timestamp: string;
    reactions: ReactionCounts;
    views: number;
    userid: string;
}

// Component prop types
export interface LikeProps {
    likeCount: number;
}

export interface TweetProps {
    tweet: TweetWithAuthor;
    linkable?: boolean;
}