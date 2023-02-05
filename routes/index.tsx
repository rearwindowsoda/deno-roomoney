import { Handlers } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
import Counter from "@/islands/Counter.tsx";
import { isLogged } from "@/signals/isLogged.tsx";
import MainAlert from "../islands/MainAlert.tsx";
import envConfig from "../utils/config.ts";

export const handler: Handlers = {
 	GET(req, ctx) {
		if(ctx.state.user){
			isLogged.value = true;
			console.log(ctx.state.user, isLogged.value)
		}else {
			isLogged.value = false;
		}
		const params = new URLSearchParams(req.url.split("?")[1]);
		const message = params.get("message");
		if(message){
			console.log(message)
			return ctx.render({
				message: params.get("message"),
			});
		}
		else {
			return ctx.render({})
		}
  },
};

interface HomeParamsInterface {
	message?: string
}

export default function Home({data}: {data: HomeParamsInterface}) {
  return (
     <Layout title="Home page test">
			<>
			{data.message && <MainAlert message={data.message}/>}
			<h1>Hello</h1>
        {isLogged.value === true ? <p>You are logged. Go to <a href={envConfig.base_url + "/dashboard"}>dashboard.</a></p> : 'Go ahead and log in'}
				<p>
          Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
          file, and refresh.
        </p>
        <Counter start={3} />
				</>
		</Layout>
  );
}
