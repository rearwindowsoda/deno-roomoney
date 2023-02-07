import { MiddlewareHandlerContext } from "$fresh/server.ts";
import * as squishyCookies from 'squishyCookies';


import envConfig from "@/utils/config.ts";
import User from "@/models/User.ts";
import { UserWithId } from "@/interfaces/UserInterface.ts";

interface State {
	user: UserWithId | 
	null;
}
export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
	try {
		const cookieVerification = await squishyCookies.verifySignedCookie(req.headers, "auth", envConfig.cookie_secret );
		const userId = (cookieVerification as string).split('.')[0];
	 	const findUser =  await User.findOne({_id: userId});
	 	if(findUser){
			ctx.state.user = findUser as unknown as UserWithId;
	 	}
		} catch {
			ctx.state.user = null;
			}
		return ctx.next();
}