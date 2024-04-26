import mongoose, { Schema } from "mongoose";

const MenShirtSchema = Schema({
  brand: String,
  productname: String,
  description: String,
  color: Array || String,
  image: Object || String,
  size: Object || String,
  overview: Array,
  materials: Object,
  price: Number,
  amount: Number,
});

const MenShirt = mongoose.model("MenShirt", MenShirtSchema, "men shirt");

export default MenShirt;
