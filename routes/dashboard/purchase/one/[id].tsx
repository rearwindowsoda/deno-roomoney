//TODO: Handler. Find purchase by id from params and fill the form with purchase data. Submitting form will edit the purchase and list all purchases dashbaord/purchase/list. Need an API route to do editing.

import { PageProps } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";

export default function EditOne(props: PageProps) {
  const { id } = props.params;
  return (
    <Layout title="Roomoney 💰 - Edit Purchase">
      <>
        <h1>Dashboard - 🛒 Edit Purchase</h1>
        <p>
          {id}
        </p>
      </>
    </Layout>
  );
}
