import { Handlers } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";
import AddPurchaseForm from "@/islands/AddPurchaseForm.tsx";
import House from "@/models/House.ts";
import User from "@/models/User.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const foundUser = ctx.state.user as UserWithIdType;
    const foundHouse = await House.findOne({ users: foundUser._id });
    if (!foundHouse) {
      return ctx.render({
        errorMessage:
          "You haven't joined or created any household. Adding purchases will not work.",
      });
    }
    if (foundHouse.users.length < 2) {
      return ctx.render({
        errorMessage:
          "You are the only one in your household. Adding purchases will not work.",
      });
    }
    const users = await User.find({ _id: { $in: foundHouse.users } });
    console.log(users);

    return ctx.render({
      users,
    });
  },
};

export interface AddPurchaseHouseInterface {
  errorMessage: string | null;
  users: UserWithIdType[] | null;
}

export default function AddPurchase(
  { data }: { data: AddPurchaseHouseInterface },
) {
  return (
    <Layout title="Roomoney 💰 - Add Purchase">
      <>
        <div className="container-sm mt-4">
          <h1>Add Purchase</h1>
          <p>
            Add the new purchase using the form below. 😃.
          </p>
          <AddPurchaseForm data={data} />
        </div>
      </>
    </Layout>
  );
}
