import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/app/lib/prisma';

export async function GET(_: NextRequest, {params}: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params;
    
    if (!id) {
        return new Response(JSON.stringify({
            error: 'Missing required param: id'
        }), {status: 400});
    }

    const tweetId = parseInt(id, 10);
    if (isNaN(tweetId)) {
        return NextResponse.json({ error: "Invalid tweet ID" }, { status: 400 });
    }

    const tweet = await prisma.tweet.findUnique({
        where: { id: tweetId },
        include: {
            author: true,
        },
    });

    if (!tweet) {
        return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    return NextResponse.json(tweet);
}
