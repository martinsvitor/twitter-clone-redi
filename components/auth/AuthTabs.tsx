type Tab = "signin" | "signup";

interface AuthTabsProps {
    tab: Tab;
    onTabChange: (tab: Tab) => void;
}

export function AuthTabs({ tab, onTabChange }: AuthTabsProps) {
    return (
        <div className="grid grid-cols-2 border-b border-border">
            {(["signin", "signup"] as Tab[]).map((t) => (
                <button
                    key={t}
                    onClick={() => onTabChange(t)}
                    className={`py-3.5 text-sm font-semibold tracking-wide transition ${
                        tab === t
                            ? "border-b-2 border-sky-500 text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    {t === "signin" ? "Sign in" : "Create account"}
                </button>
            ))}
        </div>
    );
}
