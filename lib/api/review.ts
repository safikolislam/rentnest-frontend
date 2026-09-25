import { ICreateReviewPayload, IReviewResponse } from "../types/review.types";

export const createReview = async (
  payload: ICreateReviewPayload
): Promise<IReviewResponse> => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken") || localStorage.getItem("token")
      : null;


  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.message || `Failed to submit review (${res.status})`
    );
  }

  return res.json();
};