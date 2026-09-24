const PropertiesLoading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 space-y-2">
        <div className="h-7 w-48 bg-muted rounded animate-pulse" />
        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
 
        <div className="md:col-span-1 border rounded-xl p-5 space-y-4 h-fit">
          <div className="h-5 w-16 bg-muted rounded animate-pulse" />
          <div className="h-9 w-full bg-muted rounded animate-pulse" />
          <div className="h-9 w-full bg-muted rounded animate-pulse" />
          <div className="h-9 w-full bg-muted rounded animate-pulse" />
        </div>

      
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-xl overflow-hidden">
              <div className="w-full h-48 bg-muted animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
                <div className="h-5 w-1/3 bg-muted rounded animate-pulse mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesLoading;