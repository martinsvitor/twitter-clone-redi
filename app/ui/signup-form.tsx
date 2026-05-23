import {signup} from '@/app/actions/signup';
import {useActionState} from 'react';

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined);
    return (
        <form action={action}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Name" />
            </div>
            {state?.errors?.name && <p>{state.errors.name}</p>}
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            {state?.errors.email && <p>{state.errors.email}</p>}
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />
            </div>
            {state?.errors.password && (
                <div>
                    <p>Password must:</p>
                    {state.errors.password.map((error) => (
                        <p key={error}>{error}</p>
                    ))}
                </div>
            )}
            <button type="submit">Sign Up</button>
        </form>
    )
}