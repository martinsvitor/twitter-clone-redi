"use client";

import {useState, useTransition} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

interface ProfilePageProps {
    user: {
        id: string;
        name: string | null;
        email: string;
        handle: string;
        avatar: string;
        createdAt: Date;
        _count: {
            tweets: number;
            followers: number;
            following: number;
        };
    };
}

export default function ProfilePage({user}: ProfilePageProps) {
    const {data: session, update} = useSession();
    const router = useRouter();

    const [handle, setHandle] = useState(user.handle);
    const [editingHandle, setEditingHandle] = useState(false);
    const [newHandle, setNewHandle] = useState(user.handle);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const isOwner = session?.user?.id === user.id;

    async function handleSave() {
        if (newHandle === handle) {
            setEditingHandle(false);
            return;
        }

        setError(null);
        setSuccess(null);

        startTransition(async () => {
            const res = await fetch(`/api/users/${user.id}/profile`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({handle, newHandle}),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message ?? "Something went wrong.");
                return;
            }

            setHandle(newHandle);
            setEditingHandle(false);
            setSuccess("Handle updated.");
            await update(); // refresh the session so navbar reflects the change
            router.refresh();

            setTimeout(() => setSuccess(null), 3000);
        });
    }

    function handleCancel() {
        setNewHandle(handle);
        setEditingHandle(false);
        setError(null);
    }

    const joinedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
    }).format(new Date(user.createdAt));

    return (
        <main className="min-h-screen bg-black pt-14 text-white">
            {/* Cover */}
            <div className="h-36 w-full bg-gradient-to-br from-sky-900 via-zinc-900 to-black sm:h-48"/>

            <div className="mx-auto max-w-2xl px-4">
                {/* Avatar + stats row */}
                <div className="relative -mt-12 mb-4 flex items-end justify-between sm:-mt-16">
                    <div className="relative">
                        <img
                            src={user.avatar || `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.handle}`}
                            alt={user.name ?? user.handle}
                            className="h-24 w-24 rounded-full border-4 border-black bg-zinc-800 sm:h-32 sm:w-32"
                        />
                        {/* Avatar change placeholder — wired up in a future iteration */}
                        {isOwner && (
                            <button
                                disabled
                                title="Avatar change coming soon"
                                className="absolute bottom-1 right-1 flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-full border border-white/20 bg-zinc-800 text-zinc-500 transition hover:bg-zinc-700"
                            >
                                <CameraIcon/>
                            </button>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="flex gap-5 pb-1 text-center">
                        <Stat label="Tweets" value={user._count.tweets}/>
                        <Stat label="Followers" value={user._count.followers}/>
                        <Stat label="Following" value={user._count.following}/>
                    </div>
                </div>

                {/* Name + handle */}
                <div className="mb-6">
                    <h1 className="text-xl font-bold leading-tight">
                        {user.name ?? handle}
                    </h1>

                    <div className="mt-1 flex items-center gap-2">
                        {editingHandle ? (
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-500">@</span>
                                <input
                                    value={newHandle}
                                    onChange={(e) => {
                                        setNewHandle(e.target.value);
                                        setError(null);
                                    }}
                                    autoFocus
                                    maxLength={32}
                                    className="w-40 rounded-lg border border-white/10 bg-zinc-800 px-2.5 py-1 text-sm text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                />
                                <button
                                    onClick={handleSave}
                                    disabled={isPending || !newHandle.trim()}
                                    className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-sky-400 disabled:opacity-50"
                                >
                                    {isPending ? "Saving…" : "Save"}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-zinc-400 transition hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-400">@{handle}</span>
                                {isOwner && (
                                    <button
                                        onClick={() => setEditingHandle(true)}
                                        className="rounded p-0.5 text-zinc-600 transition hover:text-zinc-300"
                                        title="Edit handle"
                                    >
                                        <PencilIcon/>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Feedback */}
                    {error && (
                        <p className="mt-2 text-xs text-red-400">{error}</p>
                    )}
                    {success && (
                        <p className="mt-2 text-xs text-emerald-400">{success}</p>
                    )}

                    {/* Joined date */}
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
                        <CalendarIcon/>
                        Joined {joinedDate}
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10"/>

                {/* Private info — only visible to owner */}
                {isOwner && (
                    <div className="mt-6 rounded-xl border border-white/10 bg-zinc-900 p-5">
                        <h2 className="mb-4 text-sm font-semibold text-zinc-300">
                            Account details
                        </h2>
                        <dl className="flex flex-col gap-3">
                            <InfoRow label="Email" value={user.email}/>
                            <InfoRow label="User ID" value={user.id} mono/>
                        </dl>
                    </div>
                )}
            </div>
        </main>
    );
}

/* ── Sub-components ───────────────────────────────────────────────────────── */

function Stat({label, value}: { label: string; value: number }) {
    return (
        <div>
            <p className="text-base font-bold leading-none">{value}</p>
            <p className="mt-0.5 text-xs text-zinc-500">{label}</p>
        </div>
    );
}

function InfoRow({
                     label,
                     value,
                     mono,
                 }: {
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <dt className="text-xs text-zinc-500">{label}</dt>
            <dd
                className={`truncate text-sm text-zinc-300 ${mono ? "font-mono text-xs" : ""}`}
            >
                {value}
            </dd>
        </div>
    );
}

function PencilIcon() {
    return (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
            <path
                d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"/>
        </svg>
    );
}

function CameraIcon() {
    return (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
            <path d="M8 6.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/>
            <path
                d="M5.52 1h4.96c.487 0 .94.24 1.217.641l.949 1.359H14a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h1.354l.949-1.359A1.5 1.5 0 0 1 5.52 1ZM2 4.5v7h12v-7H2Zm6 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/>
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
            <path
                d="M4.75 0a.75.75 0 0 1 .75.75V2h5V.75a.75.75 0 0 1 1.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 0 1 4.75 0ZM2.5 7.5v6.75c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V7.5Zm10.75-4H2.75a.25.25 0 0 0-.25.25V6h11V3.75a.25.25 0 0 0-.25-.25Z"/>
        </svg>
    );
}