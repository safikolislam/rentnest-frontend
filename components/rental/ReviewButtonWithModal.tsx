"use client";

import { useState } from "react";
import ReviewModal from "./ReviewModal";


interface ReviewButtonWithModalProps {
  propertyId: string;
}

export default function ReviewButtonWithModal({ propertyId }: ReviewButtonWithModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block mt-2 border text-sm px-4 py-2 rounded-lg font-medium hover:bg-muted transition-colors"
      >
        Leave Review
      </button>

      <ReviewModal
        propertyId={propertyId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}