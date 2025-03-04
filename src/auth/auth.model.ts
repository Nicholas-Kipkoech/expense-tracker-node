import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    role: {
      type: String,
      enum: ['admin', 'normal_user'],
      default: 'normal_user',
    },
  },
  { timestamps: true },
);
