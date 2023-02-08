import Layout from "@/components/Layout.tsx";
import RegisterForm from "@/islands/RegisterForm.tsx";
 
 
 export default function Register() {
	 return (
			<Layout title="Sign up for Roomoney">
			 <>
			 <div className="container-sm mt-4">
			 <h1>Sign in</h1>
				 <p>
					Create a new account and get full access to Roomoney app 😃. As a registered user you will be able to create virtual houses, join other houses, add purchases and keeping track of your house's balance.
				 </p>
				 <RegisterForm />
				 </div>
				 </>
		 </Layout>
	 );
 }
 