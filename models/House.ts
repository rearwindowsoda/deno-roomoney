import { model, Schema, Types } from "npm:mongoose@^6.7";



const HouseSchema = new Schema({
	name: {type: String, required: true, trim: true},
	users: [{type: Types.ObjectId, required: false}]
})


export default model("House", HouseSchema);