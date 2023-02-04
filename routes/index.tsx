import Layout from "../components/Layout.tsx";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
     <Layout title="Home page test">
			<>
			Twoja stara
        <p>
          Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
          file, and refresh.
        </p>
        <Counter start={3} />
				</>
		</Layout>
  );
}
