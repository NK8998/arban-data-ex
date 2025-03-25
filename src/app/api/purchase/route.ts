import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongoose';
import PurchaseModel from '@/libs/models/Purchase';
import { v4 as uuidv4 } from 'uuid';
import { 
  IPurchaseRequest, 
  IApiResponse,
  IPaymentDetails,
  PaymentMode 
} from '@/libs/types';

export async function POST(
  request: Request
): Promise<NextResponse<IApiResponse<IPurchaseRequest>>> {
  try {
    const body = await request.json();
    const { accountId, msisdn, offeringId, paymentMode, price, resourceAmount, validity } = body;
    
    // Validate required fields
    if (!accountId || !msisdn || !offeringId || !paymentMode || !price || !resourceAmount || !validity) {
      return NextResponse.json({ 
        status: 'error',
        error: 'Missing required fields' 
      }, { status: 400 });
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Generate a unique requestId
    const requestId = uuidv4();
    
    // Create purchase request object
    const purchaseRequest: IPurchaseRequest = {
      requestId,
      accountId,
      msisdn,
      offeringId,
      paymentMode: paymentMode as PaymentMode,
      price: Number(price),
      resourceAmount: Number(resourceAmount),
      validity: Number(validity),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Create a new purchase document
    const purchaseDoc = new PurchaseModel(purchaseRequest);
    
    // Save to database
    await purchaseDoc.save();
    
    // Process payment based on paymentMode
    let paymentResult: IPaymentDetails;
    if (paymentMode === 'airtime') {
      paymentResult = await processAirtimePayment(msisdn, price);
    } else if (paymentMode === 'mpesa') {
      paymentResult = await processMpesaPayment(msisdn, price, requestId);
    } else {
      return NextResponse.json({ 
        status: 'error',
        error: 'Invalid payment mode' 
      }, { status: 400 });
    }
    
    // Update the purchase request with payment result
    const paymentStatus = paymentResult.success ? 'completed' : 'pending';
    
    await PurchaseModel.updateOne(
      { requestId },
      { 
        $set: { 
          paymentStatus,
          paymentDetails: paymentResult,
          updatedAt: new Date()
        } 
      }
    );
    
    return NextResponse.json({
      status: paymentResult.success ? 'success' : 'pending',
      message: paymentResult.message,
      requestId,
      data: {
        ...purchaseRequest,
        paymentStatus,
        paymentDetails: paymentResult
      }
    });
  } catch (error) {
    console.error('Error processing purchase:', error);
    return NextResponse.json({ 
      status: 'error',
      error: 'Failed to process purchase' 
    }, { status: 500 });
  }
}

// Mock payment processing functions (to be replaced with actual implementations)
async function processAirtimePayment(msisdn: string, price: number | string): Promise<IPaymentDetails> {
  // Implement airtime payment processing logic
  // This would connect to your telecom provider's API
  
  // For demonstration, we'll simulate a successful payment
  return {
    success: true,
    message: 'Airtime payment processed successfully',
    transactionId: `AIR${Date.now()}`,
    timestamp: new Date()
  };
}

async function processMpesaPayment(msisdn: string, price: number | string, requestId: string): Promise<IPaymentDetails> {
  // Implement M-Pesa payment processing logic
  // This would connect to the M-Pesa API
  
  // For demonstration, we'll simulate an initiated payment that needs confirmation
  return {
    success: true, // Set to false as M-Pesa requires confirmation
    message: 'M-Pesa payment initiated. Please complete payment on your device.',
    transactionId: `MPESA${Date.now()}`,
    timestamp: new Date(),
    requestId
  };
}
