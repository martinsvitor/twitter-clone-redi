import {prisma} from '@/app/lib/db/prisma';
import {TweetWithAuthor} from '@/app/lib/definitions';
import {generateHandle, getAvatarForHandle} from '@/app/lib/utils';
import bcrypt from 'bcryptjs';
import {PrismaClientKnownRequestError} from '@/generated/prisma/internal/prismaNamespace';
import {ConflictError, NotFoundError} from '@/app/lib/errors';

export async function getTweetsWithAuthor(): Promise<TweetWithAuthor[]> {
    const tweets = await prisma.tweet.findMany({
        include: {
            author: true,
            _count: {
                select: {
                    likes: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return tweets.map(tweet => ({
        id: tweet.id,
        username: tweet.author.username,
        handle: tweet.author.handle,
        avatar: tweet.author.avatar,
        content: tweet.content,
        timestamp: tweet.createdAt.toISOString(),
        reactions: {
            likes: tweet._count.likes,
            dislikes: 0, // dislikes model removed
        },
        views: tweet.views,
        userid: tweet.authorId,
    }));
}

export async function createUser(data: {
    name?: string;
    email: string;
    password: string;
}) {
    const {name, email, password} = data;

    // Check for existing user
    const existing = await prisma.user.findUnique({where: {email}});
    if (existing) {
        throw new Error("An account with this email already exists.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate unique handle
    let handle = generateHandle(email);
    const handleTaken = await prisma.user.findUnique({where: {handle}});
    if (handleTaken) {
        handle = generateHandle(email); // retry with new suffix
    }

    const displayName = name?.trim() || email.split("@")[0];

    // Create user
    return prisma.user.create({
        data: {
            email,
            name: displayName,
            username: displayName,
            handle,
            avatar: getAvatarForHandle(handle),
            password: hashedPassword,
        },
        select: {
            id: true,
            email: true,
            name: true,
            handle: true,
        },
    });
}

export async function getUser(handle: string) {
    const user = prisma.user.findUnique({where: {handle}});
    if (!user) {
        throw new Error('No  user with the handle ' + handle + ' found');
    }
    return user;
}

export async function searchUsers(query: string) {
    return prisma.user.findMany({
        where: {
            OR: [
                {handle: {contains: query, mode: "insensitive"}},
                {name: {contains: query, mode: "insensitive"}},
                {username: {contains: query, mode: "insensitive"}},
            ]
        },
        select: {
            id: true,
            name: true,
            username: true,
            handle: true,
            avatar: true,
        },
        take: 10
    })
}

export async function updateHandle(handle: string, newHandle: string) {
    try {
        return await prisma.user.update({
            where: {handle},
            data: {handle: newHandle},
        })
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ConflictError('Handle already exists');
            }
            if (error.code === 'P2025') {
                throw new NotFoundError('User not found');
            }
        }
        throw error
    }
}
