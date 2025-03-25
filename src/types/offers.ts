export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export interface Offer {
  offeringId: number;
  offerName: string;
  description: string;
  offerPrice: number;
  resourceAccId: number;
  resourceValue: number;
  offerValidity: number;
  resourceType: string;
  offerUssdName: string;
  offerSource: string;
  locationId: null;
  subscribed: boolean;
  isActive: boolean;
}

export interface OffersResponse {
  status: string;
  message: string;
  reference: string;
  accountId: string;
  data: Offer[];
}

export interface PurchaseBody {
  accountId: string;
  msisdn: string;
  offeringId: string;
  paymentMode: string; // Payment method
  price: number | string; // Price in smallest currency unit
  resourceAmount: number | string; // Amount of resource (e.g., data in MB)
  validity: number | string; // Validity period in days
}

export interface purchaseResponse {
  status: string;
  message: string;
  requestId: string;
  data: {
    requestId: string;
    accountId: string;
    msisdn: string;
    offeringId: string;
    paymentMode: string;
    price: number;
    resourceAmount: number;
    validity: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    paymentStatus: string;
    paymentDetails: {
      success: true;
      message: string;
      transactionId: string;
      timestamp: string;
    };
  };
}

export interface KataPurchaseResponse {
  statusCode: string;
  reference: string;
  message: string;
  accountId: string;
  requestRef: string;
  data: {
    requestRefId: string;
    responseCode: number;
    responseMessage: string;
    customerMessage: string;
    timestamp: string;
  };
}

export interface KataStatusResponse {
  statusCode: string;
  reference: string;
  message: string;
  order: {
    mobileNumber: string;
    network: string;
    amount: string;
    name: string;
    offerAmount: string;
  };
}
