import { Handlers } from "$fresh/server.ts";
import * as squishyCookies from "squishyCookies";
import { compare } from "bcrypt";
import envConfig from "@/utils/config.ts";
import User from "@/models/User.ts";
import { Status } from "http";
import type { UserWithIdType as UserWithId } from "@/interfaces/UserInterface.ts";
import { isLogged } from "@/signals/isLogged.tsx";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const data: { login: string; password: string } = await req.json();
    const username: string | undefined = data.login;
    const password: string | undefined = data.password;
    if (!username || !password) {
      return new Response(
        JSON.stringify({
          message:
            "You cannot log in without username or password. Both are required.",
          status: Status.Unauthorized,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.Unauthorized,
        },
      );
    }

    try {
      const user: UserWithId | null = await User.findOne({ login: username });
      if (!user) {
        return new Response(
          JSON.stringify({
            message: "Invalid username or password.",
            status: Status.Unauthorized,
          }),
          {
            headers: { "Content-Type": "application/json}" },
            status: Status.Unauthorized,
          },
        );
      }
      const comparePasswords = await compare(password, user!.password);
      if (!comparePasswords) {
        return new Response(
          JSON.stringify({
            message: "Invalid username or password.",
            status: Status.Unauthorized,
          }),
          {
            headers: { "Content-Type": "application/json}" },
            status: Status.Unauthorized,
          },
        );
      }
      const { cookie } = await squishyCookies.createSignedCookie(
        "auth",
        user!._id.toString(),
        envConfig.cookie_secret,
        {
          maxAge: 1000 * 60 * 60,
          sameSite: "Lax",
          domain: url.hostname,
          path: "/",
          httpOnly: true,
          secure: envConfig.environment === "production",
        },
      );
      isLogged.value = true;
      return new Response(
        JSON.stringify({
          logged: true,
          status: Status.Accepted,
          location: envConfig.base_url + "/dashboard",
        }),
        {
          headers: {
            "Content-Type": "application/json}",
            "set-cookie": `${cookie}`,
          },
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
