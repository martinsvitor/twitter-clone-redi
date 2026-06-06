"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Tab = "signin" | "signup";

interface FormState {
    name: string;
    email: string;
    password: string;
}

export function useAuthForm() {
    const router = useRouter();
    const [tab, setTab] = useState<Tab>("signin");
    const [form, setForm] = useState<FormState>({ name: "", email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError(null);
    }

    async function handleCredentials(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (tab === "signup") {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
                });

                const data = await res.json();
                if (!res.ok) {
                    setError(data.message ?? "Registration failed.");
                    return;
                }
            }

            const result = await signIn("credentials", {
                redirect: false,
                email: form.email,
                password: form.password,
            });

            if (result?.error) {
                setError("Invalid email or password.");
            } else {
                router.push("/");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleOAuth(provider: "google" | "github" | "discord") {
        await signIn(provider, { callbackUrl: "/" });
    }

    function switchTab(newTab: Tab) {
        setTab(newTab);
        setError(null);
    }

    return {
        tab,
        form,
        error,
        loading,
        handleChange,
        handleCredentials,
        handleOAuth,
        switchTab,
    };
}
