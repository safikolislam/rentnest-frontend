const GlobalLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex flex-col items-center text-center">
   
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-3xl font-bold text-white">R</span>
          </div>

          <div className="absolute -inset-2 rounded-3xl border-2 border-transparent border-t-blue-600 animate-spin" />
        </div>

       
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome to RentNest
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Preparing your experience...
        </p>

     
        <div className="flex items-center gap-1.5 mt-5">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;