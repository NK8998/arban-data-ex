import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongoose';
import PurchaseModel from '@/libs/models/Purchase';
import { IPurchaseRequest, IApiResponse, RequestStatus } from '@/libs/types';

export async function GET(
  request: Request,
  { params }: { params: { requestId: string; accountId: string } }
): Promise<NextResponse<IApiResponse<IPurchaseRequest>>> {
  try {
    const { requestId, accountId } = params;
    
    if (!requestId || !accountId) {
      return NextResponse.json({ 
        status: 'error',
        error: 'Missing requestId or accountId' 
      }, { status: 400 });
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Find purchase request by requestId and accountId
    const rawPurchaseRequest = await PurchaseModel.findOne({
      requestId,
      accountId
    }).lean();
    
    if (!rawPurchaseRequest) {
      return NextResponse.json({ 
        status: 'error',
        error: 'Purchase request not found' 
      }, { status: 404 });
    }
    
    // Cast the rawPurchaseRequest to any to work around TypeScript confusion
    const purchaseData = rawPurchaseRequest as any;
    
    // Create a properly typed object
    const purchaseRequest: IPurchaseRequest = {
      requestId: purchaseData.requestId,
      accountId: purchaseData.accountId,
      msisdn: purchaseData.msisdn,
      offeringId: purchaseData.offeringId,
      paymentMode: purchaseData.paymentMode,
      price: purchaseData.price,
      resourceAmount: purchaseData.resourceAmount,
      validity: purchaseData.validity,
      status: purchaseData.status,
      paymentStatus: purchaseData.paymentStatus,
      paymentDetails: purchaseData.paymentDetails,
      createdAt: purchaseData.createdAt,
      updatedAt: purchaseData.updatedAt
    };
    
    // If the payment mode is M-Pesa and status is pending, check payment status
    if (purchaseRequest.paymentMode === 'mpesa' && purchaseRequest.status === 'pending') {
      // Implement logic to check M-Pesa payment status
      // This would connect to the M-Pesa API to check status
      
      // For demonstration, we'll randomly simulate different statuses
      const statuses: RequestStatus[] = ['completed', 'pending', 'failed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      if (randomStatus !== 'pending') {
        // Update the purchase request with the new status
        await PurchaseModel.updateOne(
          { requestId },
          { 
            $set: { 
              status: randomStatus,
              updatedAt: new Date()
            } 
          }
        );
        
        purchaseRequest.status = randomStatus;
      }
    }
    
    return NextResponse.json({
      status: 'success',
      data: purchaseRequest
    });
  } catch (error) {
    console.error('Error checking request status:', error);
    return NextResponse.json({ 
      status: 'error',
      error: 'Failed to check request status' 
    }, { status: 500 });
  }
}