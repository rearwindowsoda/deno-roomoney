import Layout from "@/components/Layout.tsx";
 
 export default function DashboardPurchase() {
	 return (
			<Layout title="Roomoney 💰 - Purchase">
				<>
			 <h1>Dashboard - 🛒 Manage Purchases</h1>
				 <p>
					 You can create, edit and delete purchases here.
				 </p>
				 <a href="/dashboard" class="btn btn-outline-light mt-4">Go Back</a>
				 <div class="d-flex justify-content-center mt-4 gap-4 p-4 flex-wrap">
				 <div class="card border-success mb-3" style="max-width: 20rem;">
				<div class="card-header">Add new purchase</div>
				<div class="card-body">
					<h4 class="card-title">You can add new purchases here.</h4>
					<p class="card-text">Click the button below to add new purchase.</p>
					<p class="card-text">
						<a href="/dashboard/purchase/add" class="btn btn-info">🛒 Add purchase</a>
					</p>
				</div>
				</div>
				<div class="card border-success mb-3" style="max-width: 20rem;">
				<div class="card-header">List balance and purchases.</div>
				<div class="card-body">
					<h4 class="card-title">See the last 50 purchases made for your household.</h4>
					<p class="card-text">You can list, edit and remove purchases here</p>
					<p class="card-text">
						<a href="/dashboard/house/list" class="btn btn-success">🏡 🧑‍🤝‍🧑 List purchases here</a>
					</p>
				</div>
				</div>

					</div>
				 </>
		 </Layout>
	 );
 }
 