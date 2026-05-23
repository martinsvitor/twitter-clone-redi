import * as zod from 'zod';

// Import Prisma-generated types for db.json structure
import type {UserModel, TweetModel, LikeModel, DislikeModel} from '@/generated/prisma/models';
import {error} from 'next/dist/build/output/log';

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
    timestamp?: string;
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

export const SignupFormSchema = zod.object({
    name: zod
        .string()
        .min(3, {error: 'It must be at least 3 characters long'})
        .max(50)
        .trim(),
    email: zod
        .email({error: 'It must be a valid email'})
        .trim(),
    password: zod
        .string()
        .min(8, {error: 'It must be at least 8 characters long'})
        .regex(/[a-zA-Z]/, {error: 'Contain at least one letter.'})
        .regex(/[0-9]/, {error: 'Contain at least one number.'})
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Contain at least one special character.',
        })
        .max(100)
        .trim(),
})

export type FormState =
    | {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    }
    message?: string;
}
    | undefined