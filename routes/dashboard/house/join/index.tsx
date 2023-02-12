import Layout from "@/components/Layout.tsx";
import JoinHouseForm from "@/islands/JoinHouseForm.tsx";
 
 
 export default function JoinHouse() {
	 return (
			<Layout title="Roomoney 💰 - Join House">
			 <>
			 <div className="container-sm mt-4">
			 <h1 class="text-success">Join someone's virtual household here</h1>
				 <p>
					<p class="text-secondary">You can join someone's virtual household with the secret code provided by the owner. Once you have joined, you can start create, update and delete purchases.</p>
				 </p>
				 </div>
				 <JoinHouseForm />
				 <a href="/dashboard/house" class="btn btn-outline-light mt-4">Go Back</a>
				 </>
		 </Layout>
	 );
 }
 