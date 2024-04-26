import { Schema, model } from "mongoose";

const ProductSchema = Schema({
  name: String,
  brand: String,
  description: String,
  basePrice: Number,
  inStock: Boolean,
  stock: Number,
  Image: Array,
  storageOptions: Array,
  colorOptions: Array,
  display: String,
  CPU: String,
  GPU: String,
  camera: Object,
});

const Tablets = model("Tablets", ProductSchema, "tablets");
export default Tablets;
