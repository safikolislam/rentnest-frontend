"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Category, Property } from "@/lib/types";
import { deleteProperty } from "@/app/dashboard/landlord/_actions/PropertyAction";
import PropertyFormModal from "./PropertyFromModal";

const PropertiesClient = ({
  initialProperties,
  categories,
}: {
  initialProperties: Property[];
  categories: Category[];
}) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>(undefined);

  const handleAddClick = () => {
    setEditingProperty(undefined);
    setModalOpen(true);
  };

  const handleEditClick = (property: Property) => {
    setEditingProperty(property);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const swalResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (swalResult.isConfirmed) {
      const result = await deleteProperty(id);
      if (result.success) {
        Swal.fire("Deleted!", "Property deleted successfully.", "success");
        router.refresh();
      } else {
        Swal.fire("Error!", result.message || "Failed to delete", "error");
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Properties</h1>
          <p className="text-muted-foreground">{initialProperties.length} listings</p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      {initialProperties.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">
          You haven`t listed any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {initialProperties.map((property) => (
            <div key={property.id} className="border rounded-xl p-4 space-y-2">
              <h3 className="font-semibold">{property.title}</h3>
              <p className="text-sm text-muted-foreground">{property.location}</p>
              <p className="text-sm font-semibold text-primary">
                ৳{property.price.toLocaleString()}/month
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleEditClick(property)}
                  className="flex-1 flex items-center justify-center gap-1.5 border py-1.5 rounded-lg text-sm"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-red-200 text-red-600 py-1.5 rounded-lg text-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <PropertyFormModal
          categories={categories}
          property={editingProperty}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default PropertiesClient;