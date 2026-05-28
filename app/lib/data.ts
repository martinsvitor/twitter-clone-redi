import fileSystem from 'node:fs/promises';
import path from 'path';
import {Database, TweetWithAuthor} from '@/app/lib/definitions';

export async function getTweetsWithAuthor(): Promise<TweetWithAuthor[]> {
    const filePath = path.join(process.cwd(), 'db.json');
    const rawData = await fileSystem.readFile(filePath, {encoding: 'utf8'});
    const database: Database = JSON.parse(rawData);

    return database.tweets.map(tweet => {
        const author = database.users.find(user => user.id === tweet.authorId);
        if (!author) {
            throw new Error(`Author not found for tweet ${tweet.id}`);
        }

        const likesCount = database.likes.filter(like => like.tweetId === tweet.id).length;
        const dislikesCount = database.dislikes.filter(dislike => dislike.tweetId === tweet.id).length;

        return {
            id: tweet.id,
            username: author.username,
            handle: author.handle,
            avatar: author.avatar,
            content: tweet.content,
            timestamp: String(tweet.createdAt),
            reactions: {
                likes: likesCount,
                dislikes: dislikesCount
            },
            views: tweet.views,
            userid: tweet.authorId
        };
    });
}
