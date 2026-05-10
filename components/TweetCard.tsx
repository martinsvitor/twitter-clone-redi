import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LikeButton from '@/components/LikeButton';
import {TweetWithAuthor, TweetProps} from '@/app/lib/definitions';

function CardContent({tweet}: { tweet: TweetWithAuthor }) {
    return (
        <div className="flex gap-3 p-4 border-b border-border hover:bg-card transition-colors">
            <Image
                src={tweet.avatar}
                alt={tweet.username}
                style={{
                    width: 48,
                    height: 48
                }}
                width={48}
                height={48}
                className="rounded-full shrink-0 border border-border"
                unoptimized
            />
            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{tweet.username}</span>
                    <span className="text-sm text-muted">{tweet.handle}</span>
                    <span className="text-sm text-muted ml-auto">{tweet.timestamp}</span>
                </div>
                <p className="text-foreground">{tweet.content}</p>

            </div>
        </div>
    );
}

export default function TweetCard({tweet, linkable = false}: TweetProps) {
    if (linkable) {
        return (
            <>
                <Link href={`/tweet/${tweet.id}`}>
                    <CardContent tweet={tweet}/>
                </Link>
                <div className="mt-2">
                    <LikeButton likeCount={tweet.reactions.likes}/>
                </div>
            </>
        )
    }
    return (
        <>
            <CardContent tweet={tweet}/>
            <div className="mt-2">
                <LikeButton likeCount={tweet.reactions.likes}/>
            </div>
        </>
    );
}