import React from 'react';
import {TweetWithAuthor} from '@/app/lib/definitions';
import TweetCard from '@/components/TweetCard';


export default async function TweetFeed() {
    const response = await fetch('http://localhost:3000/api/tweets');
    const tweets: TweetWithAuthor[] = await response.json();
    return (
        <section>
            {tweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} linkable/>
            ))}
        </section>
    )
}