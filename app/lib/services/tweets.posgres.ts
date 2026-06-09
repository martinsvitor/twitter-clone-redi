import {TweetWithAuthor} from "@/app/lib/definitions";
import {prisma} from "@/app/lib/db/prisma";


export async function getTweetsWithAuthor(): Promise<TweetWithAuthor[]> {
    const tweets = await prisma.tweet.findMany({
        include: {
            author: true,
            _count: {
                select: {
                    likes: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return tweets.map(tweet => ({
        id: tweet.id,
        username: tweet.author.username,
        handle: tweet.author.handle,
        avatar: tweet.author.avatar,
        content: tweet.content,
        timestamp: tweet.createdAt.toISOString(),
        reactions: {
            likes: tweet._count.likes,
            dislikes: 0, // dislikes model removed
        },
        views: tweet.views,
        userid: tweet.authorId,
    }));
}
