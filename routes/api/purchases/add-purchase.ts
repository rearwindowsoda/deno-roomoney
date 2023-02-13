import { Handlers } from "$fresh/server.ts";
import { Types } from "npm:mongoose@^6.7";
import { HouseWithIdType } from "@/interfaces/HouseInterface.ts";
import PurchaseWithoutId from "@/interfaces/PurchaseInterface.ts";
import type { UserWithIdType } from "@/interfaces/UserInterface.ts";
import House from "@/models/House.ts";
import Purchase from "@/models/Purchases.ts";
import { Status } from "http";
import { ZodError } from "zod";

interface AddPurchaseDTO {
	name: string, 
	amount: number, 
	paidBy: string | Types.ObjectId,
	house: Types.ObjectId,
}

export const handler: Handlers = {
  async POST(req: Request, ctx) {
    const user = ctx.state.user as unknown as UserWithIdType;
		const foundHouse = await House.findOne({_id: {$in: user.houses}}) as unknown as HouseWithIdType;

		if (!foundHouse) {
			return new Response(
				JSON.stringify({
					message:
						"You are not in any household right now.",
					status: Status.Forbidden,
				}),
				{
					headers: { "Content-Type": "application/json}" },
					status: Status.Forbidden,
				},
			);
		}
    if (foundHouse.users.length < 2) {
      return new Response(
        JSON.stringify({
          message:
            "You cannot add any purchases. You are the only person in the household. Share a secret code with somebody and let them join you here.",
          status: Status.NotAcceptable,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.NotAcceptable,
        },
      );
    }

    const purchaseData: AddPurchaseDTO = await req.json();
		
		const updatedData: AddPurchaseDTO = {
			...purchaseData,
			paidBy: new Types.ObjectId(purchaseData.paidBy as string) as Types.ObjectId,
			house: foundHouse._id
		}
      try {
        await PurchaseWithoutId.parseAsync(updatedData);
        await Purchase.create(updatedData)
        return new Response(
          JSON.stringify({
            location:
              `/dashboard/purchase/list`,
            status: Status.Created,
          }),
          {
            headers: { "Content-Type": "application/json}" },
            status: Status.Created,
          },
        );
      } catch (e) {
        console.error(e);
				const zodError = JSON.parse(e);
				const firstError: ZodError = zodError[0].message;
        return new Response(
          JSON.stringify({
            message: firstError,
            status: Status.UnprocessableEntity,
          }),
          {
            headers: { "Content-Type": "application/json}" },
            status: Status.UnprocessableEntity,
          },
        );
      }
    }
};
