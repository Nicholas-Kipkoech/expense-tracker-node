import { Schema } from 'mongoose';

export const walletSchema = new Schema(
  {
    userId: String,
    name: String,
    balance: Number,
    currency: String,
  },
  { timestamps: true },
);
