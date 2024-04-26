import { Schema, model } from "mongoose";

const ProductSchema = Schema({
  brand: String,
  name: String,
});

const Laptops = model("Laptops", ProductSchema, "laptops");
export default Laptops;
