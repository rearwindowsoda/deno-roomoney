import { Handlers } from "$fresh/server.ts";
import * as squishyCookies from "squishyCookies";
import envConfig from "../../utils/config.ts";


export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();
    if (form.get("username") === "deno" && form.get("password") === "land") {
			const user = {login: 'test', isAdmin: false};
      const { cookie } = await squishyCookies.createSignedCookie("auth", user.login, envConfig.cookie_secret, {
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
      });
    } else {
      return new Response("", {
        status: 403,
      });
    }
  },
};