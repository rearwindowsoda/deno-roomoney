import { Handlers } from "$fresh/server.ts";
import User from "@/models/User.ts";
import { Status } from "http";
import { ZodError } from "zod";
import UserWithoutId from "@/interfaces/UserInterface.ts";
import envConfig from "@/utils/config.ts";


export const handler: Handlers = {
  async POST(req) {
    const data = await req.json();
		if(data){
			try {
			await UserWithoutId.parseAsync(data);
			if(await User.exists({login: data.login})){
				return Response.json({message: "Login already exists in our database. Try something else. ", status: Status.UnprocessableEntity})
				}
			User.create(data);
			return Response.redirect(`${envConfig.base_url}?message=${"Account successfully created. You can Log in now."}`)
			}catch (e){
				console.error(e);
				const firstError: ZodError = JSON.parse(e)[0].message;
				console.log(firstError)
				return Response.json({message: firstError, status: Status.UnprocessableEntity})
				}
			}
			else{
				return Response.json({message: "Something went wrong. Try again later.", status: Status.InternalServerError})
			}

		}
}