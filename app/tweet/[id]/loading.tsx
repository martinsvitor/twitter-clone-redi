export default function Loading() {
    return (
        <div className="max-w-xl mx-auto">
            <div className="flex gap-3 p-4">
                <div className="w-12 h-12 rounded-full bg-muted/30 animate-pulse shrink-0" />
                <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 bg-muted/30 rounded animate-pulse w-1/3" />
                    <div className="h-4 bg-muted/30 rounded animate-pulse w-full" />
                    <div className="h-4 bg-muted/30 rounded animate-pulse w-2/3" />
                </div>
            </div>
        </div>
    );
}