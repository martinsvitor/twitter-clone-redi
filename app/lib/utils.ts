export function generateHandle(email: string): string {
    // Take the part before @, strip non-alphanumeric, lowercase
    const base = email.split("@")[0].replace(/[^a-z0-9_]/gi, "").toLowerCase();
    // Append a short random suffix to avoid collisions
    const suffix = Math.random().toString(36).slice(2, 6);
    return `${base}_${suffix}`;
}

export function generateAvatar(handle: string): string {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${handle}`
}

// Pre-defined avatar options for users to choose from
export const AVATAR_OPTIONS = [
    'Felix',
    'Aneka',
    'Zoey',
    'Jack',
    'Luna',
    'Max',
    'Leo',
    'Mia',
    'Noah',
    'Emma',
    'Oliver',
    'Ava',
    'Elijah',
    'Sophia',
    'James',
    'Charlotte',
    'William',
    'Amelia',
    'Benjamin',
    'Harper',
].map((seed) => ({
    seed,
    svg: generateAvatar(seed),
}));

export function getAvatarForHandle(handle: string): string {
    return generateAvatar(handle);
}
