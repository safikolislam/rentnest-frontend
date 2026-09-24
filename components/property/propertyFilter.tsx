"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

const PropertyFilters = ({ categories }: { categories: { id: string; name: string }[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "");

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (categoryId) params.set("categoryId", categoryId);

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setCategoryId("");
    router.push(pathname);
  };

  return (
    <div className="border rounded-xl p-5 space-y-5 h-fit">
      <h3 className="font-semibold">Filters</h3>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Location</label>
        <input
          type="text"
          placeholder="e.g. Gulshan"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Price range (৳)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Property type</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All types</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium"
        >
          Apply
        </button>
        <button
          onClick={clearFilters}
          className="flex-1 border py-2 rounded-lg text-sm font-medium"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default PropertyFilters;