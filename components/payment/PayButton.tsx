"use client";

import { useState } from "react";
import { createPayment } from "@/lib/api/payment";
import { toast } from "sonner";


export default function PayButton({ requestId, amount }: { requestId: string; amount: number }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await createPayment({ requestId, amount });

      if (res.success && res.data?.gatewayUrl) {
        window.location.href = res.data.gatewayUrl;
      } else {
        toast.error(res.message || "Payment initiation failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium disabled:opacity-50"
    >
      {loading ? "Redirecting..." : "Proceed to Pay"}
    </button>
  );
}