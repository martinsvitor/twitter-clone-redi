import React from 'react';
import {TweetWithAuthor} from '@/app/lib/definitions';
import TweetCard from '@/components/TweetCard';
import {getTweetsWithAuthor} from '@/app/lib/queries';


export default async function TweetFeed() {
    const tweets: TweetWithAuthor[] = await getTweetsWithAuthor();
    return (
        <section>
            {tweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} linkable/>
            ))}
        </section>
    )
}