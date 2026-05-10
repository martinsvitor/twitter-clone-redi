import {Database, TweetWithAuthor} from '@/app/lib/definitions';
import path from 'path';
import fileSystem from 'node:fs/promises';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(_: NextRequest, {params}: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params;
    if (!id) {
        return new Response(JSON.stringify({
            error: 'Missing required param: tweetId'
        }), {status: 400});
    }
    const filePath = path.join(process.cwd(), 'db.json');
    const rawData = await fileSystem.readFile(filePath, {encoding: 'utf8'});
    const database: Database = JSON.parse(rawData);
    const tweet = database.tweets.find(t => t.id === Number(id));

    if (!tweet) {
        return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    // Join user data and calculate reaction counts
    const author = database.users.find(user => user.id === tweet.authorId);
    if (!author) {
        return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const likesCount = database.likes.filter(like => like.tweetId === tweet.id).length;
    const dislikesCount = database.dislikes.filter(dislike => dislike.tweetId === tweet.id).length;

    const tweetWithAuthor: TweetWithAuthor = {
        id: tweet.id,
        username: author.username,
        handle: author.handle,
        avatar: author.avatar,
        content: tweet.content,
        timestamp: tweet.createdAt,
        reactions: {
            likes: likesCount,
            dislikes: dislikesCount
        },
        views: tweet.views,
        userid: tweet.authorId
    };

    return NextResponse.json(tweetWithAuthor);
}