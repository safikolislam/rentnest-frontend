"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StatusBadge from "@/components/rental/StatusBadge";
import ReviewModal from "../rental/ReviewModal";
import { RentalRequestWithProperty } from "@/lib/types";


export default function TenantRequestCard({ request }: { request: RentalRequestWithProperty }) {
  const [showReview, setShowReview] = useState(false);

  return (
    <div className="border rounded-xl p-4 flex flex-col sm:flex-row gap-4">
      <div className="relative w-full sm:w-40 h-32 rounded-lg overflow-hidden shrink-0">
        <Image
          src={request.property.images[0]}
          alt={request.property.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 space-y-1.5">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold">{request.property.title}</h3>
          <StatusBadge status={request.status} />
        </div>
        <p className="text-sm text-muted-foreground">{request.property.location}</p>
        <p className="text-sm">
          Rent period: <span className="font-medium">{request.rentPeriod} months</span>
        </p>
        <p className="text-sm font-semibold text-primary">
          ৳{request.property.price.toLocaleString()}/month
        </p>

        {request.status === "APPROVED" && (
          <Link
            href={`/dashboard/tenant/requests/${request.id}/pay`}
            className="inline-block mt-2 bg-primary text-primary-foreground text-sm px-4 py-2 rounded-lg font-medium"
          >
            Pay Now
          </Link>
        )}

        {request.status === "ACTIVE" && (
          <button
            onClick={() => setShowReview(true)}
            className="inline-block mt-2 border text-sm px-4 py-2 rounded-lg font-medium"
          >
            Leave Review
          </button>
        )}
      </div>

      {showReview && (
        <ReviewModal
          requestId={request.id}
          propertyId={request.property.id}
          onClose={() => setShowReview(false)}
        />
      )}
    </div>
  );
}