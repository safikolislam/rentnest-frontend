import PaymentHistoryTable from "@/components/payment/PaymentHistoryTable";

export default function PaymentHistoryPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Payment History</h2>
        <p className="text-sm text-muted-foreground">
          Track and view all your completed transactions
        </p>
      </div>

      <PaymentHistoryTable />
    </div>
  );
}