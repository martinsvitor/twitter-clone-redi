import * as React from 'react';

interface PasswordResetTemplate {
    firstName: string;
    token: string
}

export function PasswordResetTemplate({firstName, token}: PasswordResetTemplate) {
    const resetUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

    return (
        <div>
            <h1>Welcome, {firstName}!</h1>
            <h2>Reset your password</h2>
            <p>Click the link below to reset your password:</p>
            <a href={resetUrl}>${resetUrl}</a>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn&apos;t request this password reset, please ignore this email.</p>
        </div>
    );
}