"use client";

import { PropertyReviewsProps } from "@/lib/types";
import { Star } from "lucide-react";


export default function PropertyReviews({ reviews = [] }: PropertyReviewsProps) {
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <div className="space-y-6 pt-6 border-t">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Tenant Reviews</h2>
          <p className="text-sm text-slate-500">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"} for this property
          </p>
        </div>

        {reviews.length > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-800 text-lg">{averageRating}</span>
            <span className="text-xs text-slate-500">/ 5</span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed text-slate-500 text-sm">
          No reviews yet for this property.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 border rounded-xl bg-white shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 text-sm">
                  {review.user?.name || "Anonymous Tenant"}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                      }`}
                  />
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}