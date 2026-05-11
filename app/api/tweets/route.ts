import fileSystem from 'node:fs/promises';
import {NextResponse} from 'next/server';
import path from 'path';
import {Tweet, DbResponse, Database} from '@/app/lib/definitions';

export async function GET() {
    const filePath = path.join(process.cwd(), 'db.json');
    const rawData = await fileSystem.readFile(filePath, {encoding: 'utf8'});
    const database: Database = JSON.parse(rawData);
    const existingPostsId = new Set(database.posts?.map(post => post.id))
    if (database.posts?.length > 0) {
        return NextResponse.json(database.posts);
    }
    // The lines below are commented out because they are not needed. They were a workaround to populate my db.json file when I first created.
    // If you want, you can comment it out, delete the db.json content (keeping the posts array), and run the app again.

    // const response = await fetch('https://dummyjson.com/posts');

    // const body: DbResponse<Tweet[]> = await response.json();
    // const uniqueNewPosts = body.posts.filter(post => !existingPostsId.has(post.id));

    // database.posts.push(...uniqueNewPosts)
    // await fileSystem.writeFile(filePath, JSON.stringify(database, null, 2));

    return NextResponse.json(database.posts);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const filePath = path.join(process.cwd(), 'db.json');
        const rawData = await fileSystem.readFile(filePath, {encoding: 'utf8'});
        const database: Database = JSON.parse(rawData);

        const newId = database.posts.length > 0 
            ? Math.max(...database.posts.map(post => post.id)) + 1 
            : 1;

        const newPost = {
            id: newId,
            ...body,
            reactions: body.reactions || { likes: 0, dislikes: 0 },
            views: body.views || 0
        };

        database.posts.push(newPost);
        await fileSystem.writeFile(filePath, JSON.stringify(database, null, 2));

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error('Failed to create tweet:', error);
        return NextResponse.json(
            { error: 'Failed to create tweet' },
            { status: 500 }
        );
    }
}