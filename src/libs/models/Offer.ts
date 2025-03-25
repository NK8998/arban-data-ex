import mongoose, { Schema } from 'mongoose';
import { IOfferDocument } from '../types';

const OfferSchema = new Schema<IOfferDocument>(
  {
    offeringId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
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
    resourceType: { 
      type: String, 
      required: true,
      enum: ['data', 'voice', 'sms', 'combo']
    },
    isActive: { 
      type: Boolean, 
      default: true 
    }
  },
  { 
    timestamps: true 
  }
);

// Create indexes for better query performance
OfferSchema.index({ price: 1 });
OfferSchema.index({ isActive: 1 });

// Use mongoose.models to prevent OverwriteModelError when the file is imported multiple times
export default mongoose.models.Offer || mongoose.model<IOfferDocument>('Offer', OfferSchema);
