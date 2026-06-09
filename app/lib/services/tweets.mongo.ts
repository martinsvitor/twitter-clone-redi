import { connectMongo } from "@/lib/db/mongoose";
import { Tweet } from "@/models/Tweet";

export async function getTweetsMongo() {
    await connectMongo();
    return Tweet.find().sort({ createdAt: -1 }).limit(20).lean();
}

export async function createTweetMongo(data: {
    content: string;
    authorId: string;
    authorName: string;
}) {
    await connectMongo();
    return Tweet.create(data);
}