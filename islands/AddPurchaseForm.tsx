import { AddPurchaseHouseInterface } from "@/routes/dashboard/purchase/add/index.tsx";
import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

function AddPurchaseForm(props: { data: AddPurchaseHouseInterface }) {
  const [message, setMessage] = useState<string>("");
  const [credentials, setCredentials] = useState<
    { name: string; amount: number; paidBy: string | null }
  >({ name: "", amount: 0, paidBy: null });


  async function validateForm(event: JSX.TargetedEvent) {
    event.preventDefault();
		if(!credentials.paidBy) {
			setMessage("Who paid for this? Check the correct radio button.");
			return;
		}
    // try {
    //	const addPurchaseRequest = await fetch('/api/purchases/add-purchase', {
    //		method: "POST",
    //		headers: {
    //			"content-type": "application/json"
    //		},
    //		body: JSON.stringify(credentials)
    //	});
    //	const response = await addPurchaseRequest.json();
    //	if(response.location){
    //		window.location.href = response.location;
    //		return;
    //	}
    //	setMessage(response.message);
    // } catch (error) {
    //	 setMessage("Something went wrong. Try again later.")
    // }
  }
  return (
    <>
      <a href="/dashboard/purchase" class="btn btn-outline-secondary mb-4">
        Go back
      </a>
      {props.data.errorMessage &&
        (
          <div class="alert mt-4 mb-4 alert-secondary">
            <strong>Oops 😢! </strong>
            {props.data.errorMessage}
          </div>
        )}
      <form data-bitwarden-watching="1" onSubmit={validateForm}>
        <fieldset>
          <legend>Please fill in the fields with accurate information.</legend>
          <div class="form-group">
            <label for="name" class="form-label mt-4">
              Purchase name:
              <div class="col-sm-10">
                <input
                  type="text"
                  minLength={5}
                  maxLength={30}
                  readonly={false}
                  class="form-control"
                  id="name"
                  defaultValue=""
                  placeholder="purchase-name"
                  onInput={(e) =>
                    setCredentials({
                      ...credentials,
                      name: e.currentTarget.value,
                    })}
                  onFocus={() => setMessage("")}
                  required
                  disabled={!!props.data.errorMessage}
                >
                </input>
                <small class="form-text text-muted">
                  Type the purchase name here. Purchase name cannot be shorter
                  than 5 and longer than 30 characters.
                </small>
              </div>
            </label>
          </div>
          <div class="form-group">
            <label for="amount" class="form-label mt-4">
              Amount:
              <div class="col-sm-10">
                <input
                  type="number"
                  min={1}
									step={0.01}
                  readonly={false}
                  class="form-control"
                  id="amount"
                  placeholder="0"
                  onInput={(e) =>
                    setCredentials({
                      ...credentials,
                      amount: Number(e.currentTarget.value),
                    })}
                  onFocus={() => setMessage("")}
                  required
                  disabled={!!props.data.errorMessage}
                />
                <small class="form-text text-muted">
                  Type purchase amount here.
                </small>
              </div>
            </label>
          </div>
          <div class="form-group mb-4">
            {props.data.users &&
              props.data.users.map((el) => {
                return (
                  <>
                    <div class="form-check">
                      <label class="form-check-label"  for={`optionsRadios-${el._id.toString()}`}>
                        <input
                          class="form-check-input"
                          type="radio"
                          name="paidBy"
													id={`optionsRadios-${el._id.toString()}`}
                          value={el._id.toString()}
                          key={el._id.toString()}
                          onClick={(e) => {
														setCredentials({
															...credentials,
                              paidBy: e.currentTarget.value,
                            })}
													}
													checked={credentials.paidBy === el._id.toString()}
                        />
                        Paid by {el.login}
                      </label>
                    </div>
                  </>
                );
              })}
          </div>
        </fieldset>
        <button
          type="submit"
          class="btn btn-primary"
          disabled={!!props.data.errorMessage}
        >
          Add purchase 🛒
        </button>
        {message &&
          (
            <div class="alert mt-4 alert-secondary">
              <strong>Oops 😢! </strong>
              {message}
            </div>
          )}
      </form>
    </>
  );
}

export default AddPurchaseForm;
