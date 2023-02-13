import GoBackAnchor from "@/components/Common/GoBackAnchor.tsx";
import { ListHousePurchasesPropsInterface } from "@/routes/dashboard/purchase/list/index.tsx";

function AddPurchaseForm(props: { data: ListHousePurchasesPropsInterface }) {
  //TODO: List all purchases /dashboard/purchase/list. Table with purchases and buttons (EDIT / DELETE - Edit will go to API [id] route / Delete: api route / delete).  Filter the purchases with select (USER 1 / USER 2). Remember localstorage caching. Limit purchases to 50. Calculate balance from all purchases. Loading spinnner (maybe lazy loading?)
  return (
    <>
      <GoBackAnchor link="/dashboard/purchase" />
    </>
  );
}

export default AddPurchaseForm;
