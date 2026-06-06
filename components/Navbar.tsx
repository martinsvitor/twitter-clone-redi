"use client";

import Link from "next/link";
import {useSession, signOut} from "next-auth/react";
import {useState} from "react";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "@/hooks/use-theme";
import birdLogo from '@/public/bird-logo.svg';
import Image from 'next/image';

export default function Navbar() {
    const {data: session, status} = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const {theme, setTheme, effectiveTheme, mounted} = useTheme();

    const toggleTheme = () => {
        const newTheme = effectiveTheme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    const getIcon = () => {
        return effectiveTheme === "light" ? <Sun size={20} /> : <Moon size={20} />;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-foreground">
                    <Image src={birdLogo} alt="Tweeter logo" width={60} height={60} className="h-12 w-12" />
                    <span className="text-lg font-semibold tracking-tight">Tweeter</span>
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-muted/20 transition-colors text-foreground"
                            aria-label="Toggle theme"
                            title={`Current theme: ${theme}`}
                        >
                            {getIcon()}
                        </button>
                    )}
                    {status === "loading" ? (
                        <div className="h-8 w-20 animate-pulse rounded-full bg-muted/20"/>
                    ) : session ? (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen((o) => !o)}
                                className="flex items-center gap-2 rounded-full border border-border py-1.5 pl-1.5 pr-3 text-sm text-foreground transition hover:bg-muted/20"
                            >
                <span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-xs font-bold uppercase text-white">
                  {session.user?.name?.[0] ?? session.user?.email?.[0] ?? "?"}
                </span>
                                <span className="max-w-30 truncate text-sm">
                  {session.user?.name ?? session.user?.email}
                </span>
                            </button>

                            {menuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                                    <Link
                                        href="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2.5 text-sm text-muted transition hover:bg-muted/10"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2.5 text-sm text-muted transition hover:bg-muted/10"
                                    >
                                        Settings
                                    </Link>
                                    <div className="my-1 border-t border-border"/>
                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            signOut({callbackUrl: "/auth"});
                                        }}
                                        className="block w-full px-4 py-2.5 text-left text-sm text-red-400 transition hover:bg-muted/10"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/auth"
                            className="rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background transition hover:bg-muted"
                        >
                            Sign in
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}