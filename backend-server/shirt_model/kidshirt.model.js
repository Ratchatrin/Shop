import mongoose, { Schema } from "mongoose";

const KidShirtSchema = Schema({
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

const KidShirt = mongoose.model("KidShirt", KidShirtSchema, "kid shirt");

export default KidShirt;
