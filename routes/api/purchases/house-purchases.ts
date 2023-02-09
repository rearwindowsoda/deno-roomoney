import { Handlers } from "$fresh/server.ts";
import House from "@/models/House.ts";


export const handler: Handlers = {
  async GET(_req, ctx) {
	try {
		const house = await House.findOne({users: (ctx.state.user as any)._id});
	if(house){
		return Response.json({house})
	}else {
		return Response.json({message: "You are not in any house right now." })
	}
	} catch (error) {
		console.error(error)
		return Response.json({message: "Something went wrong. Try again later."})
	}
    }
}

//TODO: If there is a house, find all purchases associated to the house. If there are any purchases, send json to the front-end.