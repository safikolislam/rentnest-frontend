
"use client";

import { createProperty, updateProperty } from "@/app/dashboard/landlord/_actions/PropertyAction";
import { Category, Property } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";


const AVAILABLE_AMENITIES = ["WiFi", "Parking", "Elevator", "Generator", "AC", "Furnished"];

const PropertyForm = ({
  categories,
  property,
  onSuccess,
}: {
  categories: Category[];
  property?: Property;
  onSuccess: () => void;
}) => {
  const isEditMode = !!property;

  const [title, setTitle] = useState(property?.title || "");
  const [description, setDescription] = useState(property?.description || "");
  const [location, setLocation] = useState(property?.location || "");
  const [price, setPrice] = useState(property?.price?.toString() || "");
  const [categoryId, setCategoryId] = useState(property?.categoryId || "");
  const [amenities, setAmenities] = useState<string[]>(property?.amenities || []);
  const [images, setImages] = useState<string[]>(property?.images || [""]);
  const [loading, setLoading] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const updateImageField = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const addImageField = () => setImages([...images, ""]);
  const removeImageField = (index: number) =>
    setImages(images.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      location,
      price: Number(price),
      categoryId,
      amenities,
      images: images.filter((img) => img.trim() !== ""),
    };

    setLoading(true);
    const result = isEditMode
      ? await updateProperty(property.id, payload)
      : await createProperty(payload);
    setLoading(false);

    if (result.success) {
      toast.success(result.message || `Property ${isEditMode ? "updated" : "created"}`);
      onSuccess();
    } else {
      toast.error(result.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="e.g. Modern 3BHK Luxury Apartment"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="e.g. Gulshan 2, Dhaka"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Price (৳/month)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Amenities</label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_AMENITIES.map((amenity) => (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className={`text-sm px-3 py-1.5 rounded-full border transition ${
                amenities.includes(amenity)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground"
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Image URLs</label>
        {images.map((img, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={img}
              onChange={(e) => updateImageField(index, e.target.value)}
              placeholder="https://..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="px-3 border rounded-lg text-sm text-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addImageField}
          className="text-sm text-primary font-medium"
        >
          + Add another image
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium disabled:opacity-60"
      >
        {loading ? "Saving..." : isEditMode ? "Update Property" : "Create Property"}
      </button>
    </form>
  );
};

export default PropertyForm;