import {Database} from '@/app/lib/definitions';
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
    const tweet = database.posts.find(post => post.id === Number(id));

    if (!tweet) {
        return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    return NextResponse.json(tweet);
}