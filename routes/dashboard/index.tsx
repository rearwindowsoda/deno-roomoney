import Layout from "../../components/Layout.tsx";
import { userLogin } from "../../signals/isLogged.tsx";
 
 
 export default function Dashboard() {
	 return (
			<Layout title="Dashboard">
			 <>
			 <h1>Hello {userLogin.value}</h1>
				 <p>
					 Dashboard
				 </p>

				 </>
		 </Layout>
	 );
 }
 