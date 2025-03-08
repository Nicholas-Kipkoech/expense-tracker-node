import { Schema } from 'mongoose';

export const walletSchema = new Schema(
  {
    userId: String,
    name: String,
    balance: String,
    currency: String,
  },
  { timestamps: true },
);
