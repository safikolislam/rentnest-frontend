"use client";

import { useEffect, useState } from "react";
import { getMyPayments } from "@/lib/api/payment";

import { Loader2, CreditCard } from "lucide-react";
import { IPayment } from "@/lib/types";

export default function PaymentHistoryTable() {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getMyPayments();
        if (res.success && res.data) {
          setPayments(res.data);
        } else {
          setError("Failed to load payment history");
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load payment history");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg text-sm border border-red-200">
        {error}
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50/50 rounded-xl border border-dashed text-muted-foreground">
        <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No payment history found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs border-b">
          <tr>
            <th className="px-6 py-3 font-semibold">Property</th>
            <th className="px-6 py-3 font-semibold">Amount</th>
            <th className="px-6 py-3 font-semibold">Method</th>
            <th className="px-6 py-3 font-semibold">Transaction ID</th>
            <th className="px-6 py-3 font-semibold">Status</th>
            <th className="px-6 py-3 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50/50 transition">
              <td className="px-6 py-4 font-medium text-gray-900">
                {payment.rental?.property?.title || "N/A"}
              </td>
              <td className="px-6 py-4 font-bold text-slate-800">
                ৳{payment.amount}
              </td>
              <td className="px-6 py-4 uppercase text-xs font-medium">
                {payment.paymentMethod}
              </td>
              <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                {payment.transactionId || "N/A"}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-1 text-xs rounded-full font-semibold inline-block ${payment.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : payment.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {payment.status}
                </span>
              </td>
              <td className="px-6 py-4 text-xs text-muted-foreground">
                {new Date(payment.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}