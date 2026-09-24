

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Landlord = {
  id: string;
  name: string;
  email: string;
};

export type Property = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  amenities: string[];
  images: string[];
  status: "AVAILABLE" | "RENTED" | "UNAVAILABLE";
  landlordId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  landlord: Landlord;
};

export type PropertiesResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Property[];
};

export type SinglePropertyResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Property;
};