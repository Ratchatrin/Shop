import mongoose, { Schema } from "mongoose";

const KidPantsSchema = Schema({
  brand: String,
  productname: String,
  description: String,
  color: Array,
  image: Object,
  size: Object,
  overview: Array,
  materials: Object,
  price: Number,
});

const KidPants = mongoose.model("KidPants", KidPantsSchema, "kid pants");

export default KidPants;
