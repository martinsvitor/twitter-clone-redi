import React from 'react';
import {Tweet} from '@/app/lib/definitions';
import TweetCard from '@/components/TweetCard';


export default async function TweetFeed() {
    const response = await fetch('http://localhost:3000/api/tweets');
    const tweets: Tweet[] = await response.json();
    return (
        <section>
            {tweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} linkable/>
            ))}
        </section>
    )
}