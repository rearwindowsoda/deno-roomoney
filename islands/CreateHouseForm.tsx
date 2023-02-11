import { useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime";
import envConfig from "@/utils/config.ts";
//TODO: Handler. Show user login and show if they are currently in a house.
//TODO: Fetch api to create a house. API Route ready.

function CreateHouseForm() {
	const [message, setMessage] = useState<string>("");
	const [houseCredentials, setHouseCredentials] = useState<{name: string} | null>(null);

async function validateForm(event: JSX.TargetedEvent){
	event.preventDefault();
	try {
		const joinHouseRequest = await fetch("/api/houses/create-house", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(houseCredentials)
		});
		const response = await joinHouseRequest.json();
		if(response.message){
			setMessage(response.message);
		}else if(response.location){
			window.location.href = response.location;
			return;
		}
	} catch (error) {
		setMessage("Something went wrong. Try again later.")
	}
}

	return(
		<>
<form data-bitwarden-watching="1" onSubmit={validateForm}>
  <fieldset>
    <legend>Create a new virtual household here:</legend>
    <div class="form-group">
      <label for="login" class="form-label mt-4">House name:
      <div class="col-sm-10">
        <input type="text" readonly={false} class="form-control" id="name" minLength={5} maxLength={30} defaultValue="" placeholder="household-name" required onInput={e => setHouseCredentials({name: e.currentTarget.value})} onFocus={() => setMessage("")}></input>
				<small class="form-text text-muted">Your new virtual household name should be at least 5 characters long but not longer than 20 characters.</small>
      </div>
			</label>
    </div>
		</fieldset>
		<button type="submit" class="btn btn-primary">Create a household 🏚️</button>
		{message &&
<div class="alert mt-4 alert-secondary">
  <strong>Oops 😢! </strong> 
	{message}
	</div>
	}
</form>
</>
	)
}

export default CreateHouseForm;