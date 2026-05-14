const LoadingSpinner = () => {
  return (
    <div role="status" className="flex items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary/40" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
};

export const LoadingPage = () => {
  return (
    <div className="flex h-screenWithNav items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};
