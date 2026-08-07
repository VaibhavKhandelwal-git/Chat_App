function MessagesLoadingSkeleton() {
    return (
        <div className="mx-auto max-w-3xl space-y-5">
            {[1, 2, 3, 4, 5].map((i) => (
                <div
                    key={i}
                    className={`flex animate-pulse ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className={`h-10 rounded-2xl bg-[#2d1b1e] ${
                            i % 2 === 0 ? "w-48" : "w-64"
                        }`}
                    />
                </div>
            ))}
        </div>
    );
}

export default MessagesLoadingSkeleton;
