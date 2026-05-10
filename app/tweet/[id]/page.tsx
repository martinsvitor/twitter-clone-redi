import React from 'react';
import {notFound} from 'next/navigation';
import {TweetWithAuthor} from '@/app/lib/definitions';
import TweetCard from '@/components/TweetCard';

export default async function TweetPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const response = await fetch(`http://localhost:3000/api/tweets/${id}`)
    if (!response.ok) {
        notFound();
    }
    const tweet: TweetWithAuthor = await response.json();

    return (
        <main className="max-w-xl mx-auto">
            <h1 className="text-xl font-bold p-4 border-b border-gray-100">Tweet</h1>
            <TweetCard tweet={tweet}/>
        </main>
    );
}