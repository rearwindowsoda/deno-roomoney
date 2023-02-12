import Layout from "@/components/Layout.tsx";
import DeleteHouseForm from "@/islands/DeleteHouseForm.tsx";

 export default function DeleteHouse() {
	 return (
			<Layout title="Roomoney 💰 - Delete House">
			 <>
			 <div className="container-sm mt-4">
			 <h1 class="text-success">Delete the virtual household that you own.</h1>
				 <p>
					<p class="text-secondary">It is possible to delete your virtual household. Think about it very hard. This is a <strong class="text-warning">irreversible operation</strong>.</p>
				 </p>
				 </div>
				 <DeleteHouseForm />
				 <a href="/dashboard/house" class="btn btn-outline-light mt-4">Go Back</a>
				 </>
		 </Layout>
	 );
 }
 