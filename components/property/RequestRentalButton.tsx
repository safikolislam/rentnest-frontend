
"use client";

import { useState } from "react";
import RequestRentalModal from "./RequestRentalModal";

const RequestRentalButton = ({ propertyId }: { propertyId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium"
      >
        Request to Rent
      </button>
      {open && (
        <RequestRentalModal propertyId={propertyId} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default RequestRentalButton;