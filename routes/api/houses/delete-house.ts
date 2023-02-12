import { Handlers } from "$fresh/server.ts";
import { Status } from "http";
import House from "@/models/House.ts";
import User from "@/models/User.ts";
import { HouseWithIdType } from "@/interfaces/HouseInterface.ts";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";
import envConfig from "@/utils/config.ts";

export const handler: Handlers = {
  async DELETE(_req: Request, ctx) {
    const user = ctx.state.user as UserWithIdType;
    const foundHouse = await House.findOne({
      owner: user._id,
    }) as unknown as HouseWithIdType;
    if (!foundHouse) {
      return new Response(
        JSON.stringify({
          message:
            "You are not an owner of any virtual household. Only the owner can delete the household. You can simply leave the household you previously joined.",
          status: Status.Forbidden,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.Forbidden,
        },
      );
    }
    try {
      const foundOwner = await User.findOne({
        _id: user._id,
      }) as unknown as UserWithIdType;
      await User.updateMany({ house: foundHouse._id }, {
        $set: { houses: [] },
      });
      await House.deleteOne({ owner: foundOwner._id });

      return new Response(
        JSON.stringify({
          location:
            `${envConfig.base_url}?message=${"You have removed your household from the database. 🏡. Create another one or join someone's else household."}`,
          status: Status.Created,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.Accepted,
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
