import fs from 'fs';
import path from 'path';

// Types matching Prisma models
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
  authorEmail: string; // Use email to reference user
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

// Current db.json structure
interface CurrentUser {
  id: number;
  email: string;
  name: string;
  avatar: string;
  handle: string;
  username: string;
}

interface CurrentTweet {
  id: number;
  content: string;
  views: number;
  createdAt: string;
  authorId: number;
}

interface CurrentLike {
  userId: number;
  tweetId: number;
}

interface CurrentDatabase {
  users: CurrentUser[];
  tweets: CurrentTweet[];
  likes: CurrentLike[];
}

// New db.json structure
interface NewDatabase {
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

// Transform the database
function transformDatabase(currentDb: CurrentDatabase): NewDatabase {
  // Map users from current db (remove id)
  const users: User[] = currentDb.users.map(user => ({
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    handle: user.handle,
    username: user.username
  }));
  
  // Create userId to email mapping
  const userIdToEmail = new Map<number, string>();
  currentDb.users.forEach(user => {
    userIdToEmail.set(user.id, user.email);
  });
  
  // Map tweets from current db (remove id, convert authorId to authorEmail)
  const tweets: Tweet[] = currentDb.tweets.map(tweet => ({
    content: tweet.content,
    views: tweet.views,
    createdAt: tweet.createdAt,
    authorEmail: userIdToEmail.get(tweet.authorId)!
  }));
  
  // Create tweetId to content mapping
  const tweetIdToContent = new Map<number, string>();
  currentDb.tweets.forEach(tweet => {
    tweetIdToContent.set(tweet.id, tweet.content);
  });
  
  // Map likes from current db (convert userId to userEmail, tweetId to tweetContent)
  const likes: Like[] = currentDb.likes.map(like => ({
    userEmail: userIdToEmail.get(like.userId)!,
    tweetContent: tweetIdToContent.get(like.tweetId)!
  }));
  
  const retweets: Retweet[] = [];
  const follows: Follow[] = [];
  
  // Generate mock retweets (randomly assign some tweets to be retweeted)
  currentDb.tweets.forEach(tweet => {
    if (Math.random() > 0.7) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      retweets.push({
        userEmail: users[randomUserIndex].email,
        tweetContent: tweet.content
      });
    }
  });
  
  // Generate mock follow relationships
  users.forEach((user, i) => {
    // Each user follows 2-5 random other users
    const followCount = Math.floor(Math.random() * 4) + 2;
    for (let j = 0; j < followCount; j++) {
      const followingIndex = (i + j + 1) % users.length;
      if (followingIndex !== i) {
        follows.push({
          followerEmail: user.email,
          followingEmail: users[followingIndex].email
        });
      }
    }
  });
  
  // Empty arrays for auth-related models (will be populated by seeding script)
  const accounts: Account[] = [];
  const sessions: Session[] = [];
  const verificationTokens: VerificationToken[] = [];
  const authenticators: Authenticator[] = [];
  
  return { users, tweets, likes, retweets, follows, accounts, sessions, verificationTokens, authenticators };
}

// Main execution
const dbPath = path.join(process.cwd(), 'db.json');
const rawData = fs.readFileSync(dbPath, 'utf-8');
const currentDb: CurrentDatabase = JSON.parse(rawData);

const newDb = transformDatabase(currentDb);

// Write to a new file first for safety
const outputPath = path.join(process.cwd(), 'db.new.json');
fs.writeFileSync(outputPath, JSON.stringify(newDb, null, 2));

console.log('Transformation complete!');
console.log(`- Users: ${newDb.users.length}`);
console.log(`- Tweets: ${newDb.tweets.length}`);
console.log(`- Likes: ${newDb.likes.length}`);
console.log(`- Retweets: ${newDb.retweets.length}`);
console.log(`- Follows: ${newDb.follows.length}`);
console.log(`- Accounts: ${newDb.accounts.length}`);
console.log(`- Sessions: ${newDb.sessions.length}`);
console.log(`- VerificationTokens: ${newDb.verificationTokens.length}`);
console.log(`- Authenticators: ${newDb.authenticators.length}`);
console.log(`\nOutput written to: ${outputPath}`);
console.log('\nTo apply the changes, run:');
console.log('  mv db.json db.old.json && mv db.new.json db.json');
