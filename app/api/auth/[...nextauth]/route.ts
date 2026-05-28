import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/app/lib/prisma';
import { comparePassword } from '@/lib/auth/password';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'database' as const,
    },
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID || '',
            clientSecret: process.env.AUTH_GOOGLE_SECRET || ''
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { accounts: true }
                });

                if (!user) {
                    return null;
                }

                // Check if user has a Google account (OAuth account linking)
                const hasGoogleAccount = user.accounts.some(
                    (account: any) => account.provider === 'google'
                );

                if (hasGoogleAccount && !user.password) {
                    throw new Error(
                        'This email is registered with Google. Please sign in with Google instead.'
                    );
                }

                if (!user.password) {
                    return null;
                }

                const isPasswordValid = await comparePassword(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                };
            }
        })
    ],
    secret: process.env.AUTH_SECRET || '',
    pages: {
        signIn: '/login',
    },
    callbacks: {
        session: ({ session, user }: any) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }),
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};