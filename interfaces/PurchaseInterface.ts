import { Types } from "npm:mongoose@^6.7";
import { z } from "zod";

const PurchaseWithId = z.object({
	id: z.instanceof(Types.ObjectId),
  name: z.string({required_error: 'Purchase name should be at least 5 characters long but not more than 20.'}).min(5).max(20),
  paidBy: z.instanceof(Types.ObjectId),
  amount: z.number(),
  house: z.instanceof(Types.ObjectId),
});

export type PurchaseWithId = z.infer<typeof PurchaseWithId>;
export type PurchaseWithoutId = Omit<PurchaseWithId, 'id'>;

