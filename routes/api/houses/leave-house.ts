import { Handlers } from "$fresh/server.ts";
import { Status } from "http";
import House from "@/models/House.ts";
import User from "@/models/User.ts"
import { HouseWithIdType } from "@/interfaces/HouseInterface.ts";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";
import envConfig from "@/utils/config.ts";


export const handler: Handlers = {
  async PATCH(_req: Request, ctx) {
    const user = ctx.state.user as UserWithIdType;
			try {
				const foundHouse= await House.findOne({users: user._id}) as unknown as HouseWithIdType;
				const foundUser = await User.findOne({_id: user._id}) as unknown as UserWithIdType;
				if(!foundHouse){
					return new Response(
						JSON.stringify({message: "You have not joined any household.", status: Status.Forbidden}), 
						{headers: 
							{"Content-Type": "application/json}"}, status: Status.Forbidden});
				}
			 if(foundUser._id.equals(foundHouse.owner)){
				return new Response(
					JSON.stringify({message: "You cannot leave your own house. You have to delete it.", status: Status.Forbidden}), 
					{headers: 
						{"Content-Type": "application/json}"}, status: Status.Forbidden});
			}
			await User.updateOne({_id: foundUser._id}, {$pull: {houses: foundHouse._id}});
			await House.updateOne({users: foundUser._id}, {$pull: {users: foundUser._id}})
			return new Response(
				JSON.stringify({location: `${envConfig.base_url}?message=${"You have left the household. 🏡. Create your own or join another one."}`, status: Status.Created}), 
				{headers: 
					{"Content-Type": "application/json}"}, status: Status.Accepted});
			 }
			catch (error) {
				console.error(error);
				return new Response(
					JSON.stringify({message: "Something went wrong. Try again later.", status: Status.InternalServerError}), 
					{headers: 
						{"Content-Type": "application/json}"}, status: Status.InternalServerError});
			}

		}

	}
