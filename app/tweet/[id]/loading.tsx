export default function Loading() {
    return (
        <main className="max-w-xl mx-auto">
            <h1 className="text-xl font-bold p-4 border-b border-gray-100">Tweet</h1>
            <div className="flex gap-3 p-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse shrink-0" />
                <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
            </div>
        </main>
    );
}