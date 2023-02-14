import { Handlers } from "$fresh/server.ts";
import { PurchaseWithIdType } from "@/interfaces/PurchaseInterface.ts";
import type { UserWithIdType } from "@/interfaces/UserInterface.ts";
import Purchase from "@/models/Purchases.ts";
import { Status } from "http";
import { Types } from "npm:mongoose@^6.7";

export const handler: Handlers = {
  async POST(req: Request, ctx) {
    const user = ctx.state.user as unknown as UserWithIdType;
    const purchaseId = await req.json();

    try {
      const foundPurchase = await Purchase.findOne({
        _id: new Types.ObjectId(purchaseId),
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
      return new Response(
        JSON.stringify({
          purchase: foundPurchase,
          status: Status.OK,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.OK,
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
