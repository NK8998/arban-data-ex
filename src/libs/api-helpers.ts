import { IOffer, IPurchaseRequest, IApiResponse, PaymentMode } from './types';

/**
 * Client-side API helpers for frontend developers
 */

// Type for purchase request input
export interface IPurchaseInput {
  accountId: string;
  msisdn: string;
  offeringId: string;
  paymentMode: PaymentMode;
  price: number | string;
  resourceAmount: number | string;
  validity: number | string;
}

// Get offers for a specific MSISDN
export async function getOffers(msisdn: string): Promise<IOffer[]> {
  try {
    const response = await fetch(`/api/offers/${msisdn}`);
    const data = await response.json() as IApiResponse<IOffer[]>;
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch offers');
    }
    
    return data.data || [];
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
}

// Purchase an offer
export async function purchaseOffer(purchaseDetails: IPurchaseInput): Promise<IApiResponse<IPurchaseRequest>> {
  try {
    const response = await fetch('/api/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseDetails),
    });
    
    const data = await response.json() as IApiResponse<IPurchaseRequest>;
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to purchase offer');
    }
    
    return data;
  } catch (error) {
    console.error('Error purchasing offer:', error);
    throw error;
  }
}

// Check purchase status
export async function checkPurchaseStatus(requestId: string, accountId: string): Promise<IPurchaseRequest> {
  try {
    const response = await fetch(`/api/status/${requestId}/${accountId}`);
    const data = await response.json() as IApiResponse<IPurchaseRequest>;
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to check status');
    }
    
    return data.data as IPurchaseRequest;
  } catch (error) {
    console.error('Error checking status:', error);
    throw error;
  }
}

// Example of how to poll for status updates (for M-Pesa payments)
export function startStatusPolling(
  requestId: string, 
  accountId: string, 
  onComplete: (data: IPurchaseRequest) => void,
  onError: (error: Error) => void,
  interval = 5000,
  maxAttempts = 12
): { stopPolling: () => void } {
  let attempts = 0;
  let timerId: NodeJS.Timeout;
  
  const checkStatus = async () => {
    try {
      attempts++;
      const data = await checkPurchaseStatus(requestId, accountId);
      
      if (data.status !== 'pending' || attempts >= maxAttempts) {
        clearInterval(timerId);
        onComplete(data);
      }
    } catch (error) {
      clearInterval(timerId);
      onError(error instanceof Error ? error : new Error(String(error)));
    }
  };
  
  timerId = setInterval(checkStatus, interval);
  
  // Start first check immediately
  checkStatus();
  
  return {
    stopPolling: () => clearInterval(timerId)
  };
}
