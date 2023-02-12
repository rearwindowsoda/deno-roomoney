import { Types } from "npm:mongoose@^6.7";
import { z } from "zod";

const UserWithoutId = z.object({
  login: z.string({
    required_error:
      "Login should be at least 5 characters long but not more than 20.",
  }).min(5).max(20),
  password: z.string({
    required_error:
      "Password should be at least 5 characters long but not more than 20.",
  }).min(5).max(20),
  createdAt: z.date({ required_error: "Date is required" }).default(new Date()),
  isAdmin: z.boolean().default(false),
  houses: z.string().array().default([]),
});

const UserWithId = UserWithoutId.extend({
  _id: z.instanceof(Types.ObjectId),
});

export type UserWithoutIdType = z.infer<typeof UserWithoutId>;
export type UserWithIdType = z.infer<typeof UserWithId>;

export default UserWithoutId;
