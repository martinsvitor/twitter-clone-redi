import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import {PrismaAdapter} from '@auth/prisma-adapter';
import {prisma} from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

type CredentialsRecord = Partial<Record<"email" | "password", unknown>>

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
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
})