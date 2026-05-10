import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

// Types matching Prisma models
interface User {
  id: number;
  email: string;
  name: string | null;
  avatar: string;
  handle: string;
  username: string;
}

interface Tweet {
  id: number;
  content: string;
  views: number;
  createdAt: string;
  authorId: number;
}

interface Like {
  userId: number;
  tweetId: number;
}

interface Dislike {
  userId: number;
  tweetId: number;
}

// Current db.json structure
interface CurrentPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

interface CurrentDatabase {
  posts: CurrentPost[];
  total?: number;
  skip?: number;
  limit?: number;
}

// New db.json structure
interface NewDatabase {
  users: User[];
  tweets: Tweet[];
  likes: Like[];
  dislikes: Dislike[];
}

// Mock user data generator
function generateUserData(userId: number): User {
  // Set seed for deterministic output based on userId
  faker.seed(userId);
  
  const username = faker.internet.displayName();
  const handleUsername = faker.internet.username().toLowerCase();
  
  return {
    id: userId,
    email: faker.internet.email(),
    name: faker.person.firstName(),
    avatar: `https://i.pravatar.cc/48?u=${faker.string.uuid()}`,
    handle: `@${handleUsername}`,
    username: username
  };
}

// Transform the database
function transformDatabase(currentDb: CurrentDatabase): NewDatabase {
  const uniqueUserIds = new Set(currentDb.posts.map(post => post.userId));
  const users: User[] = Array.from(uniqueUserIds).map(generateUserData);
  
  const tweets: Tweet[] = currentDb.posts.map(post => ({
    id: post.id,
    content: `${post.title}\n\n${post.body}`,
    views: post.views,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    authorId: post.userId
  }));
  
  const likes: Like[] = [];
  const dislikes: Dislike[] = [];
  
  // Generate mock like/dislike records based on reaction counts
  currentDb.posts.forEach(post => {
    const { likes: likeCount, dislikes: dislikeCount } = post.reactions;
    
    // Generate mock likes
    for (let i = 0; i < likeCount; i++) {
      const mockUserId = (post.id * 100 + i) % 200 + 1; // Generate deterministic mock user IDs
      likes.push({ userId: mockUserId, tweetId: post.id });
    }
    
    // Generate mock dislikes
    for (let i = 0; i < dislikeCount; i++) {
      const mockUserId = (post.id * 100 + likeCount + i) % 200 + 1;
      dislikes.push({ userId: mockUserId, tweetId: post.id });
    }
  });
  
  return { users, tweets, likes, dislikes };
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
console.log(`- Dislikes: ${newDb.dislikes.length}`);
console.log(`\nOutput written to: ${outputPath}`);
console.log('\nTo apply the changes, run:');
console.log('  mv db.json db.old.json && mv db.new.json db.json');
