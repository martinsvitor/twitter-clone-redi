import {Resend} from 'resend';
import {EmailTemplate} from '@/components/email-template';
import {PasswordResetTemplate} from '@/components/password-reset-template';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email verification email
 */
export async function sendVerificationEmail(email: string, token: string) {

    try {
        const {data, error} = await resend.emails.send({
            from: 'Admin <onboarding@resend.dev>',
            to: [email],
            subject: 'Verify your email address',
            react: EmailTemplate({firstName: 'John', token})
        });
        if (error) {
            return Response.json({error}, {status: 500});
        }
        return Response.json(data);

    } catch (error) {
        console.error('Failed to send verification email:', error);
        return Response.json({error}, {status: 500});
    }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string, token: string) {
    try {
        const {data, error} = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Reset your password',
            react: PasswordResetTemplate({firstName: 'John', token}),
        });
        if (error) {
            return Response.json({
                error
            }, {status: 500});
        }
        return Response.json(data);
    } catch (error) {
        console.error('Failed to send password reset email:', error);
        return Response.json({error}, {status: 500});
    }
}
