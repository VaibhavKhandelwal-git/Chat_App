function BorderAnimatedContainer({ children, className = "" }) {
    return (
        <div
            className={`group relative w-full h-full overflow-hidden rounded-2xl ${className}`}
        >
            {/* Animated Border Layer */}
            <div
                className="
                    absolute
                    -inset-[150%]
                    bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#B38A2F_330deg,#F4DE9A_345deg,#B38A2F_360deg)]
                    opacity-0
                    group-hover:opacity-100
                    group-hover:[animation:spin_6s_linear_infinite]
                    transition-opacity
                    duration-300
                "
            />

            {/* Background / Border Mask */}
            <div className="absolute inset-[1.5px] rounded-2xl bg-[linear-gradient(135deg,#090506,#111013_55%,#090506)]" />

            {/* Content */}
            <div className="relative z-10 flex h-full w-full rounded-2xl border border-[#B38A2F]/30 bg-transparent">
                {children}
            </div>
        </div>
    );
}

export default BorderAnimatedContainer;