import {SignupFormSchema, FormState} from '@/app/lib/definitions';
import {hash, compare} from 'bcryptjs';
import {prisma} from '@/app/lib/prisma';
import {faker} from '@faker-js/faker';
import {NextResponse} from 'next/server';

export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }
    const {name, email, password} = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
        where: {handle: `@${name}`}
    });
    const hashedPassword = await hash(password, 10);

    if (existingUser) {
        const isMatch = await compare(password, hashedPassword)
        if (isMatch) {
            return NextResponse.json({
                message: 'Success'
            }, {status: 200})
        }
        return NextResponse.json({
            message: 'Invalid credentials'
        }, {status: 401})
    }


    const newUser = await prisma.user.create({
        data: {
            username: name,
            handle: `@${name.toLowerCase()}`,
            avatar: `https://i.pravatar.cc/48?u=${faker.string.uuid()}`,
            email: email,
            password: hashedPassword,
        }
    });

    if (!newUser) {
        return NextResponse.json({
            errors: {
                message: 'Failed to create user'
            }
        })
    }
    return NextResponse.json({
        message: 'Success',
        body: newUser
    }, {status: 200})
}