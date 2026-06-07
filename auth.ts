import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import {PrismaAdapter} from '@auth/prisma-adapter';
import {prisma} from '@/app/lib/prisma';
import {AdapterUser} from '@auth/core/adapters';
import bcrypt from 'bcryptjs';
import {generateAvatar, generateHandle} from '@/app/lib/utils';

type CredentialsRecord = Partial<Record<"email" | "password", unknown>>

const adapter = {
    ...PrismaAdapter(prisma),
    createUser: async (data: Omit<AdapterUser, "id">): Promise<AdapterUser> => {
        const {image, ...rest} = data;
        const handle = generateHandle(data.email);
        return prisma.user.create({
            data: {
                ...rest,
                handle,
                username: data.name ?? data.email.split("@")[0].toLowerCase(),
                avatar: image ?? generateAvatar(handle),
                emailVerified: data.emailVerified ?? null
            }
        });
    }
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter,
    session: {strategy: "jwt"},
    providers: [
        Google,
        GitHub,
        CredentialsProvider({
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials: CredentialsRecord) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {email: credentials.email as string},
                });

                if (!user || !user.password) {
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                return isValid ? user : null;
            }
        })
    ],
    callbacks: {
        jwt({token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session({session, token}) {
            session.user.id = token.id as string;
            return session;
        }
    }
})