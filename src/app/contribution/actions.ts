'use server';

import Razorpay from 'razorpay';
import {z} from 'zod';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const CreateOrderSchema = z.object({
  amount: z.number().positive('Amount must be positive.'),
});

export async function createOrder(input: {amount: number}) {
  const validation = CreateOrderSchema.safeParse(input);

  if (!validation.success) {
    return {success: false, error: 'Invalid amount.'};
  }

  const options = {
    amount: validation.data.amount * 100, // amount in the smallest currency unit
    currency: 'INR',
    receipt: `receipt_order_${new Date().getTime()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return {success: true, order};
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return {success: false, error: 'Could not create payment order.'};
  }
}
