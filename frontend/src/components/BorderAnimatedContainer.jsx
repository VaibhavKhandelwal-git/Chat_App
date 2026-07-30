function BorderAnimatedContainer({ children, className = "" }) {
    return (
        <div
            className={`w-full h-full rounded-2xl border border-transparent overflow-hidden flex animate-border [background:linear-gradient(135deg,#090506,#111013_55%,#090506)_padding-box,conic-gradient(from_var(--border-angle),rgba(96,25,32,.25)_82%,#B38A2F_88%,#F4DE9A_90%,#B38A2F_92%,rgba(96,25,32,.25)_100%)_border-box] ${className}`}
        >
            {children}
        </div>
    );
}

export default BorderAnimatedContainer;
