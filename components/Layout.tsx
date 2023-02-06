import { asset, Head } from "$fresh/runtime.ts";
import { ComponentChildren, FunctionalComponent } from "preact";
import NavBar from "@/components/NavBar.tsx";

interface LayoutProps{
	title: string;
	children: ComponentChildren
}

const Layout: FunctionalComponent<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <link rel="stylesheet" href={asset("/css/bootstrap.min.css")} />
      </Head>
			<header>
		<NavBar></NavBar>
			</header>
			<main>
			{ children }
			</main>
    </>
  );
};

export default Layout;
