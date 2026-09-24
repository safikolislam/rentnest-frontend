import PropertiesClient from "@/components/landlord/PropertyClient";
import { getMyProfile } from "@/lib/api/auth";
import { getMyProperties } from "@/lib/api/landlordProperties";
import { getCategories } from "@/lib/api/properties";


const LandlordPropertiesPage = async () => {
  const profile = await getMyProfile();
  const landlordId = profile?.data?.profile?.id;

  const [{ data: properties }, { data: categories }] = await Promise.all([
    getMyProperties(landlordId as string),
    getCategories(),
  ]);

  return <PropertiesClient initialProperties={properties} categories={categories} />;
};

export default LandlordPropertiesPage;