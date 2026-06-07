import {NextResponse} from 'next/server';
import {searchUsers} from '@/app/lib/queries';

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const query = searchParams.get('q')?.trim();

    if (!query || query.length < 0) {
        return NextResponse.json({users:[]}, {status: 200});
    }

    try {
        const users = await searchUsers(query);
        return NextResponse.json({users}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}