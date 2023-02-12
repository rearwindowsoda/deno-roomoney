import { model, Schema, Types } from "npm:mongoose@^6.7";



const HouseSchema = new Schema({
	name: {type: String, required: true, trim: true, unique: true},
	users: [{type: Types.ObjectId, required: false}],
	secretCode: {type: String, required: true, trim: true},
	owner: {type: Types.ObjectId, required: true, trim: true}
});


export default model("House", HouseSchema);