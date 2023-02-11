import Layout from "@/components/Layout.tsx";
import LeaveHouseForm from "@/islands/LeaveHouseForm.tsx";
import { Handlers } from "$fresh/server.ts";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";
 
export const handler: Handlers = {
	GET(_req, ctx) {
		const user = ctx.state.user as UserWithIdType;
		return ctx.render({
			user
		})
		}
 }

 interface LeaveHousePropsInterface {
	user?: UserWithIdType
 }
 
 export default function LeaveHouse({data}: {data: LeaveHousePropsInterface}) {
	 return (
			<Layout title="Roomoney 💰 - Leave House">
			 <>
			 <div className="container-sm mt-4">
			 <h1 class="text-success">Leave someone's virtual household here</h1>
				 <p>
					<p class="text-secondary">You can leave someone's virtual household. If you are an owner, you cannot leave a household but you can delete it. You can always rejoin someone's house, join another one or create your own virtual household.</p>
				 </p>
				 </div>
				 <LeaveHouseForm user={data.user!} />
				 <a href="/dashboard/house" class="btn btn-outline-light mt-4">Go Back</a>
				 </>
		 </Layout>
	 );
 }
 