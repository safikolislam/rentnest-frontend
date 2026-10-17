const GlobalLoading = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
          <span className="text-3xl font-bold text-primary-foreground">R</span>
        </div>

        <h2 className="text-2xl font-bold text-foreground">
          Welcome to RentNest
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Preparing your experience...
        </p>

        <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
        </div>

        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
};

export default GlobalLoading;