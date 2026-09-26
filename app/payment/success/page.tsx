"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const rentalRequestId = searchParams.get("rentalRequestId");

  useEffect(() => {
    toast.success("Payment completed successfully!");
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
      <div className="space-y-2">
        <h1 className="text-xl font-bold">Payment Successful</h1>
        <p className="text-muted-foreground">
          Your rental payment has been completed. Your rental is now active — you can leave a review once you move in.
        </p>
        {rentalRequestId && (
          <p className="text-xs text-muted-foreground">
            Reference ID: {rentalRequestId}
          </p>
        )}
      </div>
      <Link
        href="/dashboard/tenant"
        className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;