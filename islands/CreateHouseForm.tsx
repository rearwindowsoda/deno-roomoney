
//TODO: Handler. Show user login and show if they are currently in a house.
//TODO: Fetch api to create a house. API Route ready.

function CreateHouseForm() {
	return(
		<>
<form data-bitwarden-watching="1">
  <fieldset>
    <legend>Create a new virtual household here:</legend>
    <div class="form-group">
      <label for="login" class="form-label mt-4">House name:
      <div class="col-sm-10">
        <input type="text" readonly={false} class="form-control" id="login" defaultValue="" placeholder="household-name" required></input>
				<small class="form-text text-muted">Your new virtual household name should be at least 5 characters long but not longer than 20 characters.</small>
      </div>
			</label>
    </div>
		</fieldset>
		<button type="submit" class="btn btn-primary">Create a household 🏚️</button>
</form>
</>
	)
}

export default CreateHouseForm;