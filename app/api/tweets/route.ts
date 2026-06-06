import {NextResponse} from 'next/server';
import {getTweetsWithAuthor} from '../../lib/queries';

export async function GET() {
    const tweetsWithAuthor = await getTweetsWithAuthor();
    return NextResponse.json(tweetsWithAuthor);
}