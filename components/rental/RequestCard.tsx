"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import StatusBadge from "@/components/rental/StatusBadge";

import { updateRequestStatus } from "@/app/dashboard/landlord/_actions/requestAction";
import { LandlordRentalRequest } from "@/lib/types";

const RequestCard = ({ request }: { request: LandlordRentalRequest }) => {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  const handleAction = async (status: "APPROVED" | "REJECTED") => {
    setLoading(status === "APPROVED" ? "approve" : "reject");
    const result = await updateRequestStatus(request.id, status);
    setLoading(null);

    if (result.success) {
      toast.success(result.message || `Request ${status.toLowerCase()}`);
    } else {
      toast.error(result.message || "Failed to update request");
    }
  };

  return (
    <div className="border rounded-xl p-4 space-y-3">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-semibold">{request.tenant.name}</h3>
          <p className="text-sm text-muted-foreground">{request.tenant.email}</p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <p className="text-sm">
        Rent period: <span className="font-medium">{request.rentPeriod} months</span>
      </p>

      <p className="text-sm text-muted-foreground italic">{request.message}</p>

      {request.status === "PENDING" && (
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => handleAction("APPROVED")}
            disabled={loading !== null}
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium disabled:opacity-60"
          >
            <Check className="w-4 h-4" />
            {loading === "approve" ? "Approving..." : "Approve"}
          </button>
          <button
            onClick={() => handleAction("REJECTED")}
            disabled={loading !== null}
            className="flex-1 flex items-center justify-center gap-1.5 border border-red-200 text-red-600 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
          >
            <X className="w-4 h-4" />
            {loading === "reject" ? "Rejecting..." : "Reject"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestCard;