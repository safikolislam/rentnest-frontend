// components/property/RequestRentalModal.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { submitRentalRequest } from "@/app/auth/_actions/rentalAction";


const RequestRentalModal = ({
  propertyId,
  onClose,
}: {
  propertyId: string;
  onClose: () => void;
}) => {
  const [rentPeriod, setRentPeriod] = useState(6);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please write a short message");
      return;
    }

    setLoading(true);
    const result = await submitRentalRequest({
      propertyId,
      rentPeriod,
      message,
    });
    setLoading(false);

    if (result.success) {
      toast.success(result.message || "Request sent successfully");
      onClose();
      router.push("/dashboard/tenant");
    } else {
      toast.error(result.message || "Failed to send request");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Request to rent</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Rent period (months)</label>
          <input
            type="number"
            min={1}
            value={rentPeriod}
            onChange={(e) => setRentPeriod(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Message to landlord</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Tell the landlord why you're interested..."
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send request"}
        </button>
      </div>
    </div>
  );
};

export default RequestRentalModal;