import { UnknownPageProps } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
	return(
	<Layout title="Not found">
 <p>404 not found: { url.pathname }</p>
	</Layout>
	)
}