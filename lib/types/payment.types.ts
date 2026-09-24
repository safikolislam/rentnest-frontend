export interface Payment {
  id: string;
  requestId: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: string;
  property?: {
    title: string;
  };
}

export interface GetPaymentsResponse {
  success: boolean;
  statusCode?: number;
  message?: string;
  data: Payment[];
}

export interface CreatePaymentPayload {
  requestId: string;
  amount: number;
}

export interface CreatePaymentResponse {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: {
    gatewayUrl: string;
  };
}