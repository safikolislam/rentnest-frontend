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