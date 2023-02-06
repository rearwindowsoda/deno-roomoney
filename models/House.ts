import { model, Schema } from "npm:mongoose@^6.7";



const HouseSchema = new Schema({
	name: {type: String, required: true, trim: true, unique: true},
	users: [{type: String, required: false}],
	secretCode: {type: Number, required: true, trim: true},
	owner: {type: String, required: true, trim: true}
});


export default model("House", HouseSchema);