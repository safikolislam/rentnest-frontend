export type RentalRequestPayload = {
  propertyId: string;
  rentPeriod: number;
  message: string;
};

export type RentalRequestResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    id: string;
    propertyId: string;
    tenantId: string;
    rentPeriod: number;
    message: string;
    status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
    createdAt: string;
    updatedAt: string;
  };
};

export type RentalStatus = "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
export type RentalRequestWithProperty = {
  id: string;
  rentPeriod: number;
  message: string;
  status: RentalStatus;
  propertyId: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    amenities: string[];
    images: string[];
    status: string;
    landlordId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type MyRentalRequestsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: RentalRequestWithProperty[];
}




export type LandlordRentalRequest = {
  id: string;
  rentPeriod: number;
  message: string;
  status: RentalStatus;
  propertyId: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  tenant: {
    id: string;
    name: string;
    email: string;
  };
  property?: {
    id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
  };
};

export type LandlordRequestsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: LandlordRentalRequest[];
};

export type UpdateRequestStatusPayload = {
  status: "APPROVED" | "REJECTED";
};

export type UpdateRequestStatusResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    id: string;
    status: RentalStatus;
    [key: string]: unknown;
  };
};