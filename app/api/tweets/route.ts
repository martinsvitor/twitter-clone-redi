import {NextResponse} from 'next/server';
import {getTweetsWithAuthor} from '@/app/lib/data';

export async function GET() {
    const tweetsWithAuthor = await getTweetsWithAuthor();
    return NextResponse.json(tweetsWithAuthor);
}