import {NextResponse} from 'next/server';
import {prisma} from '@/app/lib/prisma';

export async function GET() {
    const tweets = await prisma.tweet.findMany({
        include: {
            author: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return NextResponse.json(tweets);
}
