import { Handlers } from "$fresh/server.ts";
import { ZodError } from "zod";
import { Status } from "http";
import {generate as uuid} from "uuid";

import HouseWithoutId from "@/interfaces/HouseInterface.ts";
import type { HouseWithIdType, HouseWithoutIdType } from "@/interfaces/HouseInterface.ts";
import type { UserWithIdType } from "@/interfaces/UserInterface.ts";
import House from "@/models/House.ts";
import User from "@/models/User.ts";


export const handler: Handlers = {
  async POST(req: Request, ctx) {
		
		const user = (ctx.state.user as unknown as UserWithIdType);
		
		if(user.houses.length > 0){
			return Response.json({message: "You already joined a house. You can leave current virtual household and then create a new one or join someone's virtual house with a secret code."})
		}
		
		let data  = await req.json();
		
		if (data){
			data = {
				...data,
				secretCode: uuid(),
				users: [user._id],
				owner: user._id
			}

			try {

			await HouseWithoutId.parseAsync(data);

			if(await House.exists({name: (data as HouseWithoutIdType).name}))
			{
				return Response.json({message: "House already exists in our database. Try a different name.", status: Status.UnprocessableEntity})
			}

			const savedHouse = await House.create(data) as unknown as HouseWithIdType;
			await User.updateOne({_id: user._id}, {$push: {houses: savedHouse._id}}, {new: true});
			return Response.json({message: "Virtual household created.", secretCode: savedHouse.secretCode});
			
			}

			catch(e) {
			console.error(e);
			const firstError: ZodError = JSON.parse(e)[0].message;
			return Response.json({message: firstError, status: Status.UnprocessableEntity})
			}
			
		}
		else {
			return Response.json({message: "Something went wrong. Try again later.", status: Status.InternalServerError})
		}
		
    }
}