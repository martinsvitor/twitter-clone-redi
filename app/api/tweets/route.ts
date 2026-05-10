import fileSystem from 'node:fs/promises';
import {NextResponse} from 'next/server';
import path from 'path';
import {Tweet, DbResponse, Database} from '@/app/lib/definitions';

export async function GET() {
    const filePath = path.join(process.cwd(), 'db.json');
    const rawData = await fileSystem.readFile(filePath, {encoding: 'utf8'});
    const database: Database = JSON.parse(rawData);
    const existingPostsId = new Set(database.posts.map(post => post.id))

    if (database.posts.length > 0) {
        return NextResponse.json(database.posts);
    }

    const response = await fetch('https://dummyjson.com/posts');

    const body: DbResponse<Tweet[]> = await response.json();
    const uniqueNewPosts = body.posts.filter(post => !existingPostsId.has(post.id));

    database.posts.push(...uniqueNewPosts)
    await fileSystem.writeFile(filePath, JSON.stringify(database, null, 2));

    return NextResponse.json(database.posts);
}