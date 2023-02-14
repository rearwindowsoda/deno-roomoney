import { Handlers } from "$fresh/server.ts";
import Purchase from "@/models/Purchases.ts";
import { Status } from "http";

import { PurchaseWithIdType } from "@/interfaces/PurchaseInterface.ts";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";

export const handler: Handlers = {
  async POST(_req, ctx) {
    const user = ctx.state.user as unknown as UserWithIdType;
    const foundHouse = user.houses;
    if (!foundHouse) {
      return new Response(
        JSON.stringify({
          message: "You are not in any household right now.",
          status: Status.Forbidden,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.Forbidden,
        },
      );
    }
    try {
      const housePurchases = await Purchase.find({ house: foundHouse }).sort({
        purchaseDate: -1,
      }) as unknown as PurchaseWithIdType[];
      if (!housePurchases) {
        return new Response(
          JSON.stringify({
            message: "No purchases in that household yet.",
            status: Status.OK,
          }),
          {
            headers: { "Content-Type": "application/json}" },
            status: Status.OK,
          },
        );
      }
      return new Response(
        JSON.stringify({
          purchases: housePurchases,
          status: Status.OK,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.OK,
        },
      );
    } catch (error) {
      console.error(error);
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
