import {signIn} from '@/auth';

export default function SignInButton() {
    return (
        <form action={async () => {
            "use server"
            await signIn('google');
        }}
        >
            <button className="p-2 border-2 bg-sky-500 text-foreground" type={'submit'}> Sign in with Google</button>
        </form>
    )
}