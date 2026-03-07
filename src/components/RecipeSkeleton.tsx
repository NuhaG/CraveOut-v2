const RecipeSkeleton = () => {
  return (
    <div className="w-full max-w-xs rounded-xl overflow-hidden bg-card animate-pulse border border-[var(--accent)]/20">
      <div className="h-48 w-full bg-[var(--bg)]/70" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-[var(--bg)]/70" />
        <div className="h-3 w-full rounded bg-[var(--bg)]/60" />
        <div className="h-3 w-5/6 rounded bg-[var(--bg)]/60" />
      </div>
    </div>
  );
};

export default RecipeSkeleton;
