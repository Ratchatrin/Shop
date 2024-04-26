import { Schema, model } from "mongoose";

const ProductSchema = Schema({
  brand: String,
  name: String,
  price: Number,
  description: String,
  color: Array,
  image: Object,
  detail: Array,
  discount: Number,
  stock: Number,
});

const Bags = model("Bags", ProductSchema, "all bags");
export default Bags;
