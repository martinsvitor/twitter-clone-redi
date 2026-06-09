import {Schema, model, models} from 'mongoose';

const FollowSchema = new Schema({
        followingId: {type: String, required: true},
        followerId: {type: String, required: true},
    },
    {timestamps: true},
);

FollowSchema.index({followingId: 1, followerId: 1}, {unique: true});

export const Follow = models.Follow ?? model('Follow', FollowSchema);