const BookSkeleton = () => (
    <div className="flex flex-col space-y-2">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted animate-pulse" />
        <div className="bg-card p-2 rounded-md shadow-sm h-[4.5rem] flex flex-col justify-center space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
        </div>
    </div>
);

export default BookSkeleton;