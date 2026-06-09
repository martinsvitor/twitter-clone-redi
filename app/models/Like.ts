import {Schema, model, models} from 'mongoose';

const LikeSchema = new Schema({
        userId: {
            type: String,
            required: true
        },
        tweetId: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

LikeSchema.index({userId: 1, tweetId: 1}, {unique: true});

export const Like = models.Like ?? model('Like', LikeSchema);