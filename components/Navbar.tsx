"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import birdLogo from "@/public/bird-logo.svg";
import Image from "next/image";

export default function Navbar() {
    const { data: session, status } = useSession();
    const { effectiveTheme, theme, setTheme, mounted } = useTheme();

    console.log('!!! SESSION', session);
    console.log('!!!!! SESSION ID', session?.user?.id);

    const toggleTheme = () => setTheme(effectiveTheme === "light" ? "dark" : "light");

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
                <NavLogo />
                <div className="flex items-center gap-3">
                    {mounted && <ThemeToggle effectiveTheme={effectiveTheme} onToggle={toggleTheme} title={`Current theme: ${theme}`} />}
                    <AuthSection session={session} status={status} />
                </div>
            </div>
        </nav>
    );
}

function NavLogo() {
    return (
        <Link href="/" className="flex items-center gap-2 text-foreground">
            <Image src={birdLogo} alt="Tweeter logo" width={60} height={60} className="h-12 w-12" />
            <span className="text-lg font-semibold tracking-tight">Tweeter</span>
        </Link>
    );
}

function ThemeToggle({ effectiveTheme, onToggle, title }: { effectiveTheme: string; onToggle: () => void; title: string }) {
    return (
        <button
            onClick={onToggle}
            className="cursor-pointer rounded-md p-2 text-foreground transition-colors hover:bg-muted/20"
            aria-label="Toggle theme"
            title={title}
        >
            {effectiveTheme === "light" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}

function AuthSection({ session, status }: { session: ReturnType<typeof useSession>["data"]; status: string }) {
    const [menuOpen, setMenuOpen] = useState(false);

    if (status === "loading") {
        return <div className="h-8 w-20 animate-pulse rounded-full bg-muted/20" />;
    }

    if (!session?.user) {
        return (
            <Link
                href="/auth"
                className="rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background transition hover:bg-muted"
            >
                Sign in
            </Link>
        );
    }

    const { name, email, id, image } = session.user;
    const initials = name?.[0] ?? email?.[0] ?? "?";
    const displayName = name ?? email;

    return (
        <div className="relative">
            <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-border py-1.5 pl-1.5 pr-3 text-sm text-foreground transition hover:bg-muted/20"
            >
                <UserAvatar image={image ?? undefined} initials={initials} />
                <span className="max-w-30 truncate">{displayName}</span>
            </button>

            {menuOpen && (
                <UserMenu
                    userId={id}
                    onClose={() => setMenuOpen(false)}
                    onSignOut={() => { setMenuOpen(false); signOut({ callbackUrl: "/auth" }); }}
                />
            )}
        </div>
    );
}

function UserAvatar({ image, initials }: { image?: string; initials: string }) {
    if (image) {
        return <img src={image} alt="avatar" className="h-6 w-6 rounded-full object-cover" />;
    }
    return (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-xs font-bold uppercase text-white">
      {initials}
    </span>
    );
}

function UserMenu({ userId, onClose, onSignOut }: { userId?: string; onClose: () => void; onSignOut: () => void }) {
    return (
        <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            <Link
                href={`/users/${userId}/profile`}
                onClick={onClose}
                className="block px-4 py-2.5 text-sm text-muted transition hover:bg-muted/10"
            >
                Profile
            </Link>
            <Link
                href="/settings"
                onClick={onClose}
                className="block px-4 py-2.5 text-sm text-muted transition hover:bg-muted/10"
            >
                Settings
            </Link>
            <div className="my-1 border-t border-border" />
            <button
                onClick={onSignOut}
                className="block w-full cursor-pointer px-4 py-2.5 text-left text-sm text-red-400 transition hover:bg-muted/10"
            >
                Sign out
            </button>
        </div>
    );
}