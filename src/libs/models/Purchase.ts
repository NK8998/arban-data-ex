import mongoose, { Schema } from 'mongoose';
import { IPurchaseRequestDocument } from '../types';

const PaymentDetailsSchema = new Schema(
  {
    success: { 
      type: Boolean, 
      required: true 
    },
    message: { 
      type: String, 
      required: true 
    },
    transactionId: { 
      type: String, 
      required: true 
    },
    timestamp: { 
      type: Date, 
      required: true 
    },
    requestId: { 
      type: String 
    }
  },
  { 
    _id: false 
  }
);

const PurchaseRequestSchema = new Schema<IPurchaseRequestDocument>(
  {
    requestId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    accountId: { 
      type: String, 
      required: true,
      index: true
    },
    msisdn: { 
      type: String, 
      required: true,
      index: true
    },
    offeringId: { 
      type: String, 
      required: true 
    },
    paymentMode: { 
      type: String, 
      required: true,
      enum: ['airtime', 'mpesa']
    },
    price: { 
      type: Number, 
      required: true,
      min: 0
    },
    resourceAmount: { 
      type: Number, 
      required: true,
      min: 0
    },
    validity: { 
      type: Number, 
      required: true,
      min: 1
    },
    status: { 
      type: String, 
      required: true,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
      index: true
    },
    paymentStatus: { 
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    paymentDetails: PaymentDetailsSchema
  },
  { 
    timestamps: true 
  }
);

// Create indexes for better query performance
PurchaseRequestSchema.index({ requestId: 1, accountId: 1 });
PurchaseRequestSchema.index({ msisdn: 1, createdAt: -1 });

// Use mongoose.models to prevent OverwriteModelError when the file is imported multiple times
export default mongoose.models.PurchaseRequest || 
  mongoose.model<IPurchaseRequestDocument>('PurchaseRequest', PurchaseRequestSchema);
