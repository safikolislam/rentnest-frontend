import React from 'react';
import PropertiesClient from "@/components/landlord/PropertyClient";
import { getMyProfile } from "@/lib/api/auth";
import { getMyProperties } from "@/lib/api/landlordProperties";
import { getCategories } from "@/lib/api/properties";

const PropertiesPageLandlord = async () => {
  const profile = await getMyProfile();

  // সম্ভাব্য সব জায়গা থেকে আইডি খোঁজার চেষ্টা, না পেলে ফাকা স্ট্রিং দেওয়া হবে
  const landlordId =
    profile?.data?.id ||
    profile?.data?.profile?.id ||
    profile?.id ||
    profile?.data?.userId ||
    profile?.userId ||
    "";

  const [{ data: properties }, { data: categories }] = await Promise.all([
    getMyProperties(landlordId),
    getCategories(),
  ]);

  return (
    <div>
      <PropertiesClient
        initialProperties={properties || []}
        categories={categories || []}
      />
    </div>
  );
};

export default PropertiesPageLandlord;