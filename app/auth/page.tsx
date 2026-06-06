"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthForm } from "@/hooks/use-auth-form";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { AuthForm } from "@/components/auth/AuthForm";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import birdLogo from "@/public/bird-logo.svg";

export default function AuthPage() {
    const { tab, form, error, loading, handleChange, handleCredentials, handleOAuth, switchTab } = useAuthForm();

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-24">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="mb-8 flex justify-center">
                    <Image src={birdLogo} alt="Tweeter logo" width={100} height={100} className="h-12 w-12" />
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                    <AuthTabs tab={tab} onTabChange={switchTab} />

                    <div className="p-6">
                        <AuthForm
                            tab={tab}
                            form={form}
                            error={error}
                            loading={loading}
                            onChange={handleChange}
                            onSubmit={handleCredentials}
                        />

                        {/* Divider */}
                        <div className="my-5 flex items-center gap-3">
                            <div className="h-px flex-1 bg-border" />
                            <span className="text-xs text-muted-foreground">or</span>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        <OAuthButtons
                            onGoogleClick={() => handleOAuth("google")}
                            onGitHubClick={() => handleOAuth("github")}
                        />

                        {/* Footer note */}
                        {tab === "signup" && (
                            <p className="mt-4 text-center text-xs text-muted-foreground">
                                By creating an account, you agree to our{" "}
                                <Link href="/terms" className="text-sky-500 hover:underline">Terms</Link> and{" "}
                                <Link href="/privacy" className="text-sky-500 hover:underline">Privacy Policy</Link>.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}