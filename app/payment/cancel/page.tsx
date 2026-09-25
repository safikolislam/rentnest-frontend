import Link from "next/link";
import { XCircle } from "lucide-react";

const PaymentCancelPage = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <XCircle className="w-16 h-16 text-red-600 mx-auto" />
      <div className="space-y-2">
        <h1 className="text-xl font-bold">Payment Cancelled</h1>
        <p className="text-muted-foreground">
          Your payment was not completed. You can try again from your dashboard.
        </p>
      </div>
      <Link
        href="/dashboard/tenant"
        className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default PaymentCancelPage;