import {auth} from "@/auth";
import {NextResponse} from 'next/server';
import {updateHandle} from '@/app/lib/queries';
import {ConflictError, NotFoundError} from '@/app/lib/errors';

export async function PATCH(req: Request, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const {id} = await params;

    if (!session?.user) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    if (session.user.id !== id) {
        return NextResponse.json({error: 'Forbidden'}, {status: 403});
    }

    try {
        const {handle, newHandle} = await req.json();
        const user = await updateHandle(handle, newHandle);
        return NextResponse.json({user}, {status: 200});
    } catch (error) {
        console.error(error);
        if (error instanceof  NotFoundError) {
            return NextResponse.json({message: error.message}, {status: 404});
        }
        if (error instanceof  ConflictError) {
            return NextResponse.json({message: error.message}, {status: 409});
        }
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}
