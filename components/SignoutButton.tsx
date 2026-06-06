import {signOut, auth} from '@/auth';

export default async function SignoutButton() {
    const session = await auth();
    if (!session) {
        return <></>;
    }
    return (
        <form action={async () => {
            "use server";
            await signOut();
        }}
        >
            <button className="p-2 border-2 bg-sky-500 text-foreground" type={'submit'}>Sign out</button>
        </form>
    )
}