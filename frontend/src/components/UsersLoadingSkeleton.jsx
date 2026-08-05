function UsersLoadingSkeleton() {
  return (
    <div className="space-y-2">

      {/* Create 3 skeleton cards while users are loading */}
      {[1, 2, 3, 4, 5, 6,7].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-xl border border-[#2d1b1e] bg-[#120b0d] p-4"
        >
          <div className="flex items-center gap-3">

            {/* Avatar Skeleton */}
            <div className="size-12 rounded-full bg-[#2d1b1e]"></div>

            {/* Text Skeleton */}
            <div className="flex-1 space-y-2">

              {/* Username Skeleton */}
              <div className="h-4 w-3/5 rounded bg-[#2d1b1e]"></div>

              {/* Status Skeleton */}
              <div className="h-3 w-1/3 rounded bg-[#221316]"></div>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersLoadingSkeleton;