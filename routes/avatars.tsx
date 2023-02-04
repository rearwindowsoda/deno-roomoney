import { Handlers } from "https://deno.land/x/fresh@1.1.2/server.ts";
import Layout from "../components/Layout.tsx";


export const handler: Handlers = {
  async GET(req, ctx) {
		const data = await fetch('https://jsonplaceholder.typicode.com/todos')
    const response = await data.json();
	
    return ctx.render({
    response
    });
  },
};

export default function Avatars({
  data,
}: {
  data: { response: any[]; };
}) {
  return (
		<Layout title="Avatars">
			 <ul>
			{data.response.map(el => <li key={el.id}>${el.title}</li>)}
			 </ul>
			
		</Layout>
  );
}