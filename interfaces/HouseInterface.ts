import { Types } from "npm:mongoose@^6.7";
import { z } from "zod";

const HouseWithoutId = z.object({
  name: z.string({
    required_error:
      "House name should be at least 5 characters long but not more than 30.",
  }).min(5).max(30),
  secretCode: z.string({
    required_error: "Secret code should be 36 characters long",
  }).length(36),
  users: z.instanceof(Types.ObjectId).array().default([]),
  owner: z.instanceof(Types.ObjectId),
});

const HouseWithId = HouseWithoutId.extend({
  _id: z.instanceof(Types.ObjectId),
});

export type HouseWithoutIdType = z.infer<typeof HouseWithoutId>;
export type HouseWithIdType = z.infer<typeof HouseWithId>;

export default HouseWithoutId;
