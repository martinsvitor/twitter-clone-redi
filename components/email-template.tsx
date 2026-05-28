import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    token: string
}

export function EmailTemplate({firstName, token}: EmailTemplateProps) {
    const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

    return (
        <div>
            <h1>Welcome, {firstName}!</h1>
            <h2>Verify your email</h2>
            <p>Click the link below to verify your email address:</p>
            <a href={verifyUrl}>${verifyUrl}</a>
            <p>This link will expire in 24 hours.</p>
        </div>
    );
}