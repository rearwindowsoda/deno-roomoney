import { Handlers } from "$fresh/server.ts";
import UserWithoutId from "@/interfaces/UserInterface.ts";
import User from "@/models/User.ts";
import envConfig from "@/utils/config.ts";
import { hash } from "bcrypt";
import { Status } from "http";
import { ZodError } from "zod";


export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = await req.json();
		if(data){
			try {
			await UserWithoutId.parseAsync({login: data.login.trim(), password: data.password.trim()});
			if(await User.exists({login: data.login.trim()})){
				return new Response(
					JSON.stringify({message: "Login already exists in our database. Try something else.", status: Status.UnprocessableEntity}), 
					{headers: 
						{"Content-Type": "application/json}"}, status: Status.UnprocessableEntity});
				}
			User.create({...data, password: await hash(data.password)});
				return new Response(
					JSON.stringify({location: `${envConfig.base_url}?message=${"Account successfully created 👨‍👨‍👧. You can log in now."}`, status: Status.Created}), 
					{headers: 
						{"Content-Type": "application/json}"}, status: Status.Created});
			}catch (e){
				console.error(e);
				const firstError: ZodError = JSON.parse(e)[0].message;
				return new Response(
					JSON.stringify({message: firstError, status: Status.UnprocessableEntity}), 
					{headers: 
						{"Content-Type": "application/json}"}, status: Status.UnprocessableEntity});
				}
			}
			else{
				return new Response(
					JSON.stringify({message: "Something went wrong. Try again later.", status: Status.InternalServerError}), 
					{headers: 
						{"Content-Type": "application/json}"}, status: Status.InternalServerError});
			}

		}
}