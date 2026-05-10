// Import Prisma-generated types for db.json structure
import type {UserModel, TweetModel, LikeModel, DislikeModel} from '@/generated/prisma/models';

// Re-export Prisma types for db.json structure
export type User = UserModel;
export type Tweet = TweetModel;
export type Like = LikeModel;
export type Dislike = DislikeModel;

// UI-specific types (what the API returns after joining/aggregating)
export interface ReactionCounts {
    likes: number;
    dislikes: number;
}

export interface TweetWithAuthor {
    id: number;
    username: string;
    handle: string;
    avatar: string;
    content: string;
    timestamp: string;
    reactions: ReactionCounts;
    views: number;
    userid: number;
}

// Database structure (matches db.json)
export interface Database {
    users: User[];
    tweets: Tweet[];
    likes: Like[];
    dislikes: Dislike[];
}

// Component prop types
export interface LikeProps {
    likeCount: number;
}

export interface TweetProps {
    tweet: TweetWithAuthor;
    linkable?: boolean;
}