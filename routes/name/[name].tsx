import { PageProps } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";


export default function Greet(props: PageProps) {
  return (
	<Layout title={ "Hello" + " " + props.params.name }>
		<p> Hello { props.params.name }</p>
		</Layout>

	)
}
