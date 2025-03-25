// Common types used throughout the application
import { Document } from 'mongoose';

// Offer interfaces
export interface IOffer {
  
  offeringId: string;
  name: string;
  description: string;
  price: number;
  resourceAmount: number;
  validity: number;
  resourceType: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOfferDocument extends IOffer, Document {}

// Purchase request interfaces
export type PaymentMode = 'airtime' | 'mpesa';
export type RequestStatus = 'pending' | 'completed' | 'failed';

export interface IPaymentDetails {
  success: boolean;
  message: string;
  transactionId: string;
  timestamp: Date;
  requestId?: string;
}

export interface IPurchaseRequest {
  requestId: string;
  accountId: string;
  msisdn: string;
  offeringId: string;
  paymentMode: PaymentMode;
  price: number;
  resourceAmount: number;
  validity: number;
  status: RequestStatus;
  paymentStatus?: RequestStatus;
  paymentDetails?: IPaymentDetails;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPurchaseRequestDocument extends IPurchaseRequest, Document {}

// API Response type
export interface IApiResponse<T> {
  status: 'success' | 'error' | 'pending';
  message?: string;
  data?: T;
  error?: string;
  requestId?: string;
}
