"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPayment } from "@/lib/api/payment";

const PayNowPage = () => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const rentalRequestId = params.id as string;

  const handlePayment = async () => {
    setLoading(true);
    const result = await createPayment({ rentalRequestId });
    setLoading(false);

    if (result.success && result.data?.paymentUrl) {
      window.location.href = result.data.paymentUrl;
    } else {
      toast.error(result.message || "Failed to start payment");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
      <h1 className="text-xl font-bold">Complete Your Payment</h1>
      <p className="text-muted-foreground">
        You&apos;re about to proceed to a secure payment gateway to complete your rental payment.
      </p>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium disabled:opacity-60"
      >
        {loading ? "Redirecting..." : "Proceed to Payment"}
      </button>
      <button
        onClick={() => router.back()}
        className="text-sm text-muted-foreground hover:underline"
      >
        Cancel
      </button>
    </div>
  );
};

export default PayNowPage;