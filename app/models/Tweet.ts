import {Schema, model, models} from 'mongoose';

const TweetSchema = new Schema({
        content: {
            type: String,
            required: true,
            maxlength: 280,
        },
        authorId: {
            type: String,
            required: true,
        },
        authorName: {
            type: String,
            required: true,
        },
        likeCount: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

export const Tweet = models.Tweet ?? model('Tweet', TweetSchema);

