import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { GitHubIcon } from "@/components/icons/GitHubIcon";

interface OAuthButtonsProps {
    onGoogleClick: () => void;
    onGitHubClick: () => void;
}

export function OAuthButtons({ onGoogleClick, onGitHubClick }: OAuthButtonsProps) {
    return (
        <div className="flex flex-col gap-2.5">
            <OAuthButton onClick={onGoogleClick} icon={<GoogleIcon />} label="Continue with Google" />
            <OAuthButton onClick={onGitHubClick} icon={<GitHubIcon />} label="Continue with GitHub" />
        </div>
    );
}

function OAuthButton({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-input bg-input px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted active:scale-[0.98]"
        >
            {icon}
            {label}
        </button>
    );
}
