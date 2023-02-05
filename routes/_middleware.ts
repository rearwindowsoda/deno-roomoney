import { MiddlewareHandlerContext } from "https://deno.land/x/fresh@1.1.2/server.ts";
import * as squishyCookies from 'squishyCookies';

import envConfig from "../utils/config.ts";

interface State {
	user: string | 
	null;
}
export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
	try {
		const cookieVerification = await squishyCookies.verifySignedCookie(req.headers, "auth", envConfig.cookie_secret );
		console.log(cookieVerification);
		ctx.state.user = (cookieVerification as string).split('.')[0];
		} catch {
			ctx.state.user = null;
		}
		return ctx.next();
}