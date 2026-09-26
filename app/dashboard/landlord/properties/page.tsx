import React from 'react';
import PropertiesClient from "@/components/landlord/PropertyClient";

import { getCategories } from '@/lib/api/properties';
import { getMyProperties } from '@/lib/api/landlordProperties';


const PropertiesPageLandlord = async () => {
  const [{ data: properties }, { data: categories }] = await Promise.all([
    getMyProperties(),
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