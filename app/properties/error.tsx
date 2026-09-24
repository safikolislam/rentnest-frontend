"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

const PropertiesError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground">
        We `couldn`t` load the properties. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium"
      >
        <RotateCcw className="w-4 h-4" />
        Try again
      </button>
    </div>
  );
};

export default PropertiesError;