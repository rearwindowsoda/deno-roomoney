import { Types } from "npm:mongoose@^6.7";
import { z } from "zod";

const UserWithoutId = z.object({
  login: z.string({required_error: 'Login should be at least 5 characters long but not more than 10.'}).min(5).max(10),
  password: z.string({required_error: 'Password should be at least 5 characters long but not more than 15.'}).min(5).max(15),
  createdAt: z.date({required_error: 'Date is required'}).default(new Date()),
  isAdmin: z.boolean().default(false),
  houses: z.string().array().default([]),
});

const UserWithId = UserWithoutId.extend({
_id: z.instanceof(Types.ObjectId)
})

export type UserWithoutId = z.infer<typeof UserWithoutId>;
export type UserWithId = z.infer<typeof UserWithId>;


export default UserWithoutId;