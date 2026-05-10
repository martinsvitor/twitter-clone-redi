import {prisma} from "@/app/lib/prisma";
import {faker} from '@faker-js/faker';

async function main() {
    const user = await prisma.user.create({
        data: {
            username: faker.internet.displayName(),
            handle: `@${faker.internet.username().toLowerCase()}`,
            avatar: `https://i.pravatar.cc/48?u=${faker.string.uuid()}`,
            email: faker.internet.email(),
            tweets: {
                create: {
                    content: "Testing script.ts create"
                }
            }
        },
        include: {
            tweets: true
        }
    });
    console.log('!! Created user: ', user);

    const allUsers = await prisma.user.findMany({
        include: {
            tweets: true
        }
    });
    console.log('!! All users found', JSON.stringify(allUsers, null, 2));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })