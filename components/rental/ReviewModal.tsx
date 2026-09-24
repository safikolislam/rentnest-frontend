"use client";

import { useState } from "react";

import { Star } from "lucide-react";
import { createReview } from "@/lib/api/review";
import { toast } from "sonner";

export default function ReviewModal({
  requestId,
  propertyId,
  onClose,
}: {
  requestId: string;
  propertyId: string;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    setLoading(true);
    try {
      const res = await createReview({ requestId, propertyId, rating, comment });
      if (res.success) {
        toast.success("Review submitted");
        onClose();
      } else {
        toast.error(res.message || "Failed to submit review");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4">
        <h3 className="font-semibold text-lg">Leave a Review</h3>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)}>
              <Star
                className={`w-6 h-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="w-full border rounded-lg p-3 text-sm h-24 resize-none"
        />

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}