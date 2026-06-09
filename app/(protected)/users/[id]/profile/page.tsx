import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/db/prisma";
import ProfilePage from "./ProfilePage";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
    const { id } = await params;

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            handle: true,
            avatar: true,
            createdAt: true,
            _count: {
                select: {
                    tweets: true,
                    followers: true,
                    following: true,
                },
            },
        },
    });

    if (!user) notFound();

    return <ProfilePage user={user} />;
}