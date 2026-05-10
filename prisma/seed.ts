// prisma/seed.ts
import {prisma} from '@/app/lib/prisma'
import {faker} from "@faker-js/faker";

const TWEET_CONTENTS = [
    "Just deployed my first Next.js app with App Router. Server Components are a game changer.",
    "Hot take: TypeScript errors are just the compiler trying to help you. Stop fighting it.",
    "Three hours debugging. The bug was a missing semicolon. I'm going for a walk.",
    "Finally understood the difference between useEffect and Server Components. Mind blown.",
    "PSA: Tailwind CSS is not 'just inline styles'. Fight me.",
    "The best part of pair programming is having someone to blame.",
    "npm install is my meditation practice. I just sit and wait.",
    "Learned more from one broken deployment than six months of tutorials.",
    "Dynamic routing in Next.js is genuinely elegant. params just works.",
    "Reminder that 'it works on my machine' is not a deployment strategy.",
    "Just refactored 200 lines into 40. Feels illegal.",
    "Why write comments when you can write clean code? (I write neither)",
    "Git commit message: 'fix'. Three hours later: 'actually fix'.",
    "async/await is beautiful until you forget to await something.",
    "Finished my portfolio. Now I just need projects to put in it.",
    "The difference between junior and senior is knowing which Stack Overflow answer to trust.",
    "Just discovered Prettier. Where has this been my whole life.",
    "REST API returning 200 with an error message inside. Classic.",
    "React state management be like: we have the data at home.",
    "Wrote a component so reusable I'm putting it on my CV.",
];

async function main() {
    console.log("🌱 Seeding database...");

    // Clean existing data in dependency order (children before parents)
    await prisma.like.deleteMany();
    await prisma.retweet.deleteMany();
    await prisma.follow.deleteMany();
    await prisma.tweet.deleteMany();
    await prisma.user.deleteMany();

    // --- Users ---
    const users = await Promise.all(
        Array.from({length: 6}, () =>
            prisma.user.create({
                data: {
                    username: faker.internet.displayName(),
                    handle: `@${faker.internet.username().toLowerCase()}`,
                    avatar: `https://i.pravatar.cc/48?u=${faker.string.uuid()}`,
                    email: faker.internet.email(),
                },
            })
        )
    );
    console.log(`✅ Created ${users.length} users`);

    // --- Tweets ---
    const tweets = await Promise.all(
        TWEET_CONTENTS.map((content, i) =>
            prisma.tweet.create({
                data: {
                    content,
                    views: faker.number.int({min: 100, max: 10000}),
                    createdAt: faker.date.recent({days: 7}),
                    authorId: users[i % users.length].id, // distribute tweets across users
                },
            })
        )
    );
    console.log(`✅ Created ${tweets.length} tweets`);

    // --- Likes ---
    // Each user likes a random subset of tweets
    const likeEntries: { userId: number; tweetId: number }[] = [];

    for (const user of users) {
        const tweetSubset = faker.helpers.arrayElements(
            tweets,
            faker.number.int({min: 2, max: 8})
        );
        for (const tweet of tweetSubset) {
            // Avoid users liking their own tweets, like a real platform
            if (tweet.authorId !== user.id) {
                likeEntries.push({userId: user.id, tweetId: tweet.id});
            }
        }
    }

    await prisma.like.createMany({data: likeEntries, skipDuplicates: true});
    console.log(`✅ Created ${likeEntries.length} likes`);

    // --- Retweets ---
    const retweetEntries: { userId: number; tweetId: number }[] = [];

    for (const user of users) {
        const tweetSubset = faker.helpers.arrayElements(
            tweets,
            faker.number.int({min: 1, max: 4})
        );
        for (const tweet of tweetSubset) {
            if (tweet.authorId !== user.id) {
                retweetEntries.push({userId: user.id, tweetId: tweet.id});
            }
        }
    }

    await prisma.retweet.createMany({data: retweetEntries, skipDuplicates: true});
    console.log(`✅ Created ${retweetEntries.length} retweets`);

    // --- Follows ---
    // Each user follows a random subset of other users
    const followEntries: { followerId: number; followingId: number }[] = [];

    for (const user of users) {
        const otherUsers = users.filter((u) => u.id !== user.id);
        const toFollow = faker.helpers.arrayElements(
            otherUsers,
            faker.number.int({min: 1, max: otherUsers.length})
        );
        for (const target of toFollow) {
            followEntries.push({followerId: user.id, followingId: target.id});
        }
    }

    await prisma.follow.createMany({data: followEntries, skipDuplicates: true});
    console.log(`✅ Created ${followEntries.length} follow relationships`);

    console.log("🎉 Done!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });