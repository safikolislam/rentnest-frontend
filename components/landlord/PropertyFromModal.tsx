
"use client";

import { X } from "lucide-react";
import PropertyForm from "./PropertyForm";
import { Category, Property } from "@/lib/types";


const PropertyFormModal = ({
  categories,
  property,
  onClose,
}: {
  categories: Category[];
  property?: Property;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {property ? "Edit Property" : "Add New Property"}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <PropertyForm categories={categories} property={property} onSuccess={onClose} />
      </div>
    </div>
  );
};

export default PropertyFormModal;