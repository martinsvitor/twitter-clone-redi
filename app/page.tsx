import TweetFeed from '@/components/TweetFeed';

export default async function Home() {

    return (
        <main className="max-w-xl mx-auto">
            <h1 className="text-xl font-bold p-4 border-b border-gray-100">Home</h1>
            <TweetFeed/>
        </main>
    );
}
