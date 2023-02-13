import { model, Schema, Types } from "npm:mongoose@^6.7";

const PurchaseSchema = new Schema({
  name: { type: String, required: true, trim: true },
  paidBy: { type: Types.ObjectId, required: true },
  purchaseDate: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  house: { type: String, required: true, trim: true },
});

export default model("Purchase", PurchaseSchema);
