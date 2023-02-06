import { Types } from "npm:mongoose@^6.7";
import { z } from "zod";

const HouseWithId = z.object({
	id: z.instanceof(Types.ObjectId),
  name: z.string({required_error: 'House name should be at least 5 characters long but not more than 10.'}).min(5).max(10),
  secretCode: z.string({required_error: 'Secret code should be 36 characters long'}).length(36),
  users: z.instanceof(Types.ObjectId).array().default([]),
  owner: z.instanceof(Types.ObjectId),
});

export type HouseWithId = z.infer<typeof HouseWithId>;
export type HouseWithoutId = Omit<HouseWithId, 'id'>;

