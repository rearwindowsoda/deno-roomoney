import { Handlers } from "$fresh/server.ts";
import Alert from "@/components/Common/Alert.tsx";
import Layout from "@/components/Layout.tsx";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";
import House from "@/models/House.ts";
import User from "@/models/User.ts";
import { HouseWithIdType } from "@/interfaces/HouseInterface.ts";
import ListPurchasesIsland from "@/islands/ListPurchasesIsland.tsx";
import GoBackAnchor from "@/components/Common/GoBackAnchor.tsx";

export interface ListHousePurchasesPropsInterface {
  errorMessage: string | null;
  users: UserWithIdType[] | null;
}
export const handler: Handlers = {
  async GET(_req, ctx) {
    const loggedUser = ctx.state.user as UserWithIdType;
    const loggedUsersHouse = await House.findOne({
      users: loggedUser._id,
    }) as unknown as HouseWithIdType;
    if (!loggedUsersHouse) {
      return ctx.render({
        errorMessage:
          "You are not in any household right now. Add or create one.",
      });
    }
    const secondUser = await User.findOne({
      _id: {
        $in: loggedUsersHouse.users.filter((el) => !el.equals(loggedUser._id)),
      },
    });
    if (!loggedUsersHouse) {
      return ctx.render({
        errorMessage:
          "You haven't joined or created any household. Listing purchases will not work.",
      });
    }
    if (!secondUser) {
      return ctx.render({
        errorMessage:
          "You cannot list purchases. You are the only person in your household. Invite someone in.",
      });
    }
    return ctx.render({
      users: [loggedUser, secondUser],
    });
  },
};

export default function ListHousePurchasesProps(
  { data }: { data: ListHousePurchasesPropsInterface },
) {
  return (
    <Layout title="Roomoney 💰 - List house purchases">
      <>
        {data.errorMessage
          ? (
            <>
              <GoBackAnchor link="/dashboard/purchase" />
              <Alert
                class="alert mt-4 alert-secondary"
                message={data.errorMessage}
              />
            </>
          )
          : (
            <div className="container-sm mt-4">
              <h1>List purchases:</h1>
              <p>
                See 50 last purchases made in your virtual household. 😃.
              </p>
              <ListPurchasesIsland data={data} />
            </div>
          )}
      </>
    </Layout>
  );
}
