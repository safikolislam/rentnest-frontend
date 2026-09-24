const TenantDashboardLoading = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-56 bg-muted rounded animate-pulse" />
        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border rounded-xl p-4 flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-40 h-32 bg-muted rounded-lg animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-2/3 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantDashboardLoading;