"use client";

import Link from "next/link";

type Tab = "signin" | "signup";

interface AuthFormProps {
    tab: Tab;
    form: { name: string; email: string; password: string };
    error: string | null;
    loading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function AuthForm({ tab, form, error, loading, onChange, onSubmit }: AuthFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
            {tab === "signup" && (
                <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                        Display name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required={tab === "signup"}
                        value={form.name}
                        onChange={onChange}
                        placeholder="Jane Doe"
                        className="w-full rounded-lg border border-input bg-input px-3.5 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                </div>
            )}

            <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Email address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-input bg-input px-3.5 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
            </div>

            <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={tab === "signup" ? "new-password" : "current-password"}
                    required
                    value={form.password}
                    onChange={onChange}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-input bg-input px-3.5 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
            </div>

            {tab === "signin" && (
                <div className="flex justify-end">
                    <Link href="/auth/forgot-password" className="text-xs text-sky-500 hover:underline">
                        Forgot password?
                    </Link>
                </div>
            )}

            {error && (
                <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-full bg-sky-500 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Please wait…" : tab === "signin" ? "Sign in" : "Create account"}
            </button>
        </form>
    );
}
