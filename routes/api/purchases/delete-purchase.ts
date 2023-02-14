import { Handlers } from "$fresh/server.ts";
import { PurchaseWithIdType } from "@/interfaces/PurchaseInterface.ts";
import type { UserWithIdType } from "@/interfaces/UserInterface.ts";
import Purchase from "@/models/Purchases.ts";
import { Status } from "http";
import { Types } from "npm:mongoose@^6.7";

interface PurchaseUpdateDTO {
  name: string;
  amount: number;
  id: Types.ObjectId;
}

export const handler: Handlers = {
  async DELETE(req: Request, ctx) {
    const user = ctx.state.user as unknown as UserWithIdType;
    const purchase: PurchaseUpdateDTO = await req.json();

    try {
      const foundPurchase = await Purchase.findOne({
        _id: new Types.ObjectId(purchase.id),
      }) as unknown as PurchaseWithIdType;

      if (!foundPurchase || !foundPurchase.paidBy.equals(user._id)) {
        return new Response(
          JSON.stringify({
            message:
              "Something is wrong. Purchase id not valid or maybe you are trying to edit purchase that you did not make.",
            status: Status.Forbidden,
          }),
          {
            headers: { "Content-Type": "application/json}" },
            status: Status.Forbidden,
          },
        );
      }
      await Purchase.deleteOne({ _id: foundPurchase._id });

      return new Response(
        JSON.stringify({
          location: `/dashboard/purchase/list`,
          status: Status.Created,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.Created,
        },
      );
    } catch (e) {
      console.error(e);
      return new Response(
        JSON.stringify({
          message: "Something went wrong. Try again later.",
          status: Status.InternalServerError,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.InternalServerError,
        },
      );
    }
  },
};
