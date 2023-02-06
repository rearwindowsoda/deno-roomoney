import { model, Schema } from "npm:mongoose@^6.7";

const UserSchema = new Schema({
	login: {type: String, unique: true, required: true, trim: true},
	password: {type: String, required: true, trim: true},
	createdAt: {type:Date, default: Date.now, required: false},
	isAdmin: {type: Boolean, default: false, required: false},
	houses: [{type: String, required: false}]
})

export default model("User", UserSchema);
