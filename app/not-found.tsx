
import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6">
      <div className="text-center max-w-md">
        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-blue-600 tracking-tight">
          404
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-600 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
          It may have been moved or no longer exists.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          Back to Home
        </Link>

        {/* Brand */}
        <p className="mt-8 text-sm text-gray-400">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">RentNest</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;

