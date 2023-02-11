import Layout from "@/components/Layout.tsx";
import { Handlers } from "$fresh/server.ts";
import House from "@/models/House.ts";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";
import { HouseWithIdType } from "@/interfaces/HouseInterface.ts";

export const handler: Handlers = {
	async GET(req, ctx) {
		const user = ctx.state.user as UserWithIdType;
		const house = await House.findOne({owner: user._id});
		if(house){
			const {secretCode} = house as unknown as HouseWithIdType;
			return ctx.render({
				secretCode
			})
		}else{
			return ctx.render({})
		}
 }
};
 
interface DashboardHousePropsInterface {
	secretCode?: string
}


 export default function DashboardHouse({data}: {data: DashboardHousePropsInterface}) {
	 return (
			<Layout title="Roomoney 💰 - House">
				<>
			 <h1>Dashboard - 🏚️ Manage Virutal Households</h1>
				 <p>
					 You can create, join and manage virutal households here.
				 </p>
				 <a href="/dashboard" class="btn btn-outline-light mt-4">Go Back</a>
				 <div class="d-flex justify-content-center mt-4 gap-4 p-4 flex-wrap">
				 <div class="card border-primary mb-3" style="max-width: 20rem;">
				<div class="card-header">Create a virtual household</div>
				<div class="card-body">
					<h4 class="card-title">You can create virtual household and invite a user to join.</h4>
					<p class="card-text">You can create a virtual household if you don't already own or joined any. You need to come up with a unique name of your new virtual household. After creating a household, a <strong class="text-warning">secret code</strong> will be prompted to you. Copy the code or take a screenshot of it, it will be needed for the other person to join you in your household.</p>
					<p class="card-text">
						<a href="/dashboard/house/create" class="btn btn-info">🏠 Create a virtual household</a>
					</p>
				</div>
				</div>
				<div class="card border-primary mb-3" style="max-width: 20rem;">
				<div class="card-header">Join someone's virtual household</div>
				<div class="card-body">
					<h4 class="card-title">You can join someone's virtual household.</h4>
					<p class="card-text">You can join someone's virtual household. In order to do this, you will need a <strong class="text-warning">secret code</strong> given to you by household's owner.</p>
					<p class="card-text">
						<a href="/dashboard/house/join" class="btn btn-primary">🧑‍🤝‍🧑 Join someone's household</a>
					</p>
				</div>
				</div>
				<div class="card border-primary mb-3" style="max-width: 20rem;">
				<div class="card-header">Leave your current household</div>
				<div class="card-body">
					<h4 class="card-title">You can leave the household you are currently in.</h4>
					<p class="card-text">You can leave the household you previously joined and create or join another one. If you change your mind, you can rejoin the previous household with a <strong class="text-warning">secret code</strong> provided by the owner.</p>
					<p class="card-text">
						<a href="/dashboard/house/leave" class="btn btn-secondary">👋 Leave current household</a>
					</p>
				</div>
				</div>
				<div class="card border-primary mb-3" style="max-width: 20rem;">
				<div class="card-header">Delete your household</div>
				<div class="card-body">
					<h4 class="card-title">If you are an owner of a household, you can delete it.</h4>
					<p class="card-text">If you created a household, you can delete it. It will remove the household entirely alongside with its purchases and users. Only an owner can delete household. A <strong class="text-warning">secret code</strong> will also be needed.</p>
					<p class="card-text">
						<a href="/dashboard/house/delete" class="btn btn-secondary">🙅🏻 Delete your household</a>
					</p>
				</div>
				</div>
				{data.secretCode &&
				<div class="card border-success mb-3" style="max-width: 20rem;">
					<div class="card-body">
					<h4 class="card-title">Secret code</h4>
					<p class="card-text">You are an owner of a virtual household. Here is your secret code: <br /> <strong class="text-success">{data.secretCode}</strong></p>
				</div>
				</div>
				}
					</div>
				 </>
		 </Layout>
	 );
 }
 