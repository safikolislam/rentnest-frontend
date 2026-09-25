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
  rentalRequestId: string;
}

export interface CreatePaymentResponse {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: {
    paymentUrl: string; 
  };
}

export interface IPayment {
  id: string;
  rentalId: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: string;
  rental?: {
    property?: {
      title: string;
    };
  };
}

export interface IPaymentHistoryResponse {
  success: boolean;
  message?: string;
  data: IPayment[];
}