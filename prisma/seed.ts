// prisma/seed.ts
import { prisma } from '@/app/lib/prisma';
import fs from 'fs';
import path from 'path';

// Types matching the transformed db.json structure
interface User {
  email: string;
  name: string | null;
  avatar: string;
  handle: string;
  username: string;
  password?: string;
}

interface Tweet {
  content: string;
  views: number;
  createdAt: string;
  authorEmail: string;
}

interface Like {
  userEmail: string;
  tweetContent: string;
}

interface Retweet {
  userEmail: string;
  tweetContent: string;
}

interface Follow {
  followerEmail: string;
  followingEmail: string;
}

interface Account {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

interface Session {
  sessionToken: string;
  userId: string;
  expires: string;
}

interface VerificationToken {
  identifier: string;
  token: string;
  expires: string;
}

interface Authenticator {
  credentialID: string;
  userId: string;
  providerAccountId: string;
  credentialPublicKey: string;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports?: string;
}

interface Database {
  users: User[];
  tweets: Tweet[];
  likes: Like[];
  retweets: Retweet[];
  follows: Follow[];
  accounts: Account[];
  sessions: Session[];
  verificationTokens: VerificationToken[];
  authenticators: Authenticator[];
}

async function main() {
  console.log("🌱 Seeding database...");

  // Read transformed data from db.new.json
  const dbPath = path.join(process.cwd(), 'db.new.json');
  const rawData = fs.readFileSync(dbPath, 'utf-8');
  const db: Database = JSON.parse(rawData);

  // Clean existing data in dependency order (children before parents)
  await prisma.like.deleteMany();
  await prisma.retweet.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.tweet.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.authenticator.deleteMany();
  await prisma.user.deleteMany();

  // --- Users ---
  const users = await Promise.all(
    db.users.map((user) =>
      prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          handle: user.handle,
          username: user.username,
          password: user.password,
        },
      })
    )
  );
  console.log(`✅ Created ${users.length} users`);

  // Create email → userId mapping
  const emailToUserId = new Map<string, string>();
  users.forEach((user) => {
    emailToUserId.set(user.email, user.id);
  });

  // --- Tweets ---
  const tweets = await Promise.all(
    db.tweets.map((tweet) =>
      prisma.tweet.create({
        data: {
          content: tweet.content,
          views: tweet.views,
          createdAt: new Date(tweet.createdAt),
          authorId: emailToUserId.get(tweet.authorEmail)!,
        },
      })
    )
  );
  console.log(`✅ Created ${tweets.length} tweets`);

  // Create content → tweetId mapping
  const contentToTweetId = new Map<string, string>();
  tweets.forEach((tweet) => {
    contentToTweetId.set(tweet.content, tweet.id);
  });

  // --- Likes ---
  const likeEntries: { userId: string; tweetId: string }[] = [];
  for (const like of db.likes) {
    const userId = emailToUserId.get(like.userEmail);
    const tweetId = contentToTweetId.get(like.tweetContent);
    if (userId && tweetId) {
      likeEntries.push({ userId, tweetId });
    }
  }
  if (likeEntries.length > 0) {
    await prisma.like.createMany({ data: likeEntries, skipDuplicates: true });
  }
  console.log(`✅ Created ${likeEntries.length} likes`);

  // --- Retweets ---
  const retweetEntries: { userId: string; tweetId: string }[] = [];
  for (const retweet of db.retweets) {
    const userId = emailToUserId.get(retweet.userEmail);
    const tweetId = contentToTweetId.get(retweet.tweetContent);
    if (userId && tweetId) {
      retweetEntries.push({ userId, tweetId });
    }
  }
  if (retweetEntries.length > 0) {
    await prisma.retweet.createMany({ data: retweetEntries, skipDuplicates: true });
  }
  console.log(`✅ Created ${retweetEntries.length} retweets`);

  // --- Follows ---
  const followEntries: { followerId: string; followingId: string }[] = [];
  for (const follow of db.follows) {
    const followerId = emailToUserId.get(follow.followerEmail);
    const followingId = emailToUserId.get(follow.followingEmail);
    if (followerId && followingId) {
      followEntries.push({ followerId, followingId });
    }
  }
  if (followEntries.length > 0) {
    await prisma.follow.createMany({ data: followEntries, skipDuplicates: true });
  }
  console.log(`✅ Created ${followEntries.length} follow relationships`);

  // --- Accounts ---
  if (db.accounts.length > 0) {
    await prisma.account.createMany({ data: db.accounts, skipDuplicates: true });
    console.log(`✅ Created ${db.accounts.length} accounts`);
  }

  // --- Sessions ---
  if (db.sessions.length > 0) {
    await prisma.session.createMany({ data: db.sessions, skipDuplicates: true });
    console.log(`✅ Created ${db.sessions.length} sessions`);
  }

  // --- Verification Tokens ---
  if (db.verificationTokens.length > 0) {
    await prisma.verificationToken.createMany({ data: db.verificationTokens, skipDuplicates: true });
    console.log(`✅ Created ${db.verificationTokens.length} verification tokens`);
  }

  // --- Authenticators ---
  if (db.authenticators.length > 0) {
    await prisma.authenticator.createMany({ data: db.authenticators, skipDuplicates: true });
    console.log(`✅ Created ${db.authenticators.length} authenticators`);
  }

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