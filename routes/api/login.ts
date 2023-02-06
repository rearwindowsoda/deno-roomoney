import { Handlers } from "$fresh/server.ts";
import * as squishyCookies from "squishyCookies";
import {compare} from "bcrypt";
import envConfig from "@/utils/config.ts";
import User from "@/models/User.ts";
import { Status } from "http";
import { UserWithId } from "@/interfaces/UserInterface.ts";


export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();
		const username: FormDataEntryValue | null = form.get("username");
		const password: FormDataEntryValue | null = form.get("password");
		if(!username || !password) {
			return Response.json({message: "You cannot log in without username or password. Both are required.", status: Status.Unauthorized });
		}

		try {
			const user: UserWithId | null = await User.findOne({login: username});
				const comparePasswords = await compare(password as string, user!.password);
				if (!comparePasswords) {
					return Response.json({message: "Invalid username or password.", status: Status.Unauthorized })
				}
				const { cookie } = await squishyCookies.createSignedCookie("auth", user!.login, envConfig.cookie_secret, {
					maxAge: 1000 * 60 * 60 * 24 * 7,
					sameSite: "Lax",
					domain: url.hostname,
					path: "/",
					httpOnly: true,
					secure: envConfig.environment === "production"
				});
				return new Response("", {
					status: 302,
					headers: {
						Location: envConfig.base_url + "/dashboard",
						"set-cookie": cookie
					},
			})}
			catch (error) {
				console.error(error);
				return Response.json({message: "Something went wrong. Try again later.", status: Status.InternalServerError })
		}
}
}