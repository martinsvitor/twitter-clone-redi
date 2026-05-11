'use client'
import {SessionProvider} from 'next-auth/react';
import TweetFeed from '@/components/TweetFeed';

export default async function Home({Component, pageProps: {session, ...pageProps}}) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps}/>
            <div className="max-w-xl mx-auto">
                <TweetFeed/>
            </div>
        </SessionProvider>
    );
}
