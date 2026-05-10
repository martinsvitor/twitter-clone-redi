import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LikeButton from '@/components/LikeButton';
import {Tweet, TweetProps} from '@/app/lib/definitions';

function CardContent({tweet}: { tweet: Tweet }) {
    return (
        <div className="flex gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <Image
                src={tweet.avatar || '/'}
                alt={tweet.username || 'blank'}
                width={48}
                height={48}
                className="rounded-full shrink-0"
            />
            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{tweet.username}</span>
                    <span className="text-sm text-gray-400">{tweet.handle}</span>
                    <span className="text-sm text-gray-400 ml-auto">{tweet.timestamp}</span>
                </div>
                <p className="text-gray-800">{tweet.content}</p>
                <div className="mt-2">
                    <LikeButton likeCount={tweet.reactions.likes}/>
                </div>
            </div>
        </div>
    );
}

export default function TweetCard({tweet, linkable = false}: TweetProps) {
    if (linkable) {
        return (
            <Link href={`/tweet/${tweet.id}`}>
                <CardContent tweet={tweet}/>
            </Link>
        )
    }
    return <CardContent tweet={tweet}/>;
}