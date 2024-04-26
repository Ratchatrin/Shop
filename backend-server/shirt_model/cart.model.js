import mongoose, { Schema } from "mongoose";

const CartSchema = Schema({
  brand: String,
  productname: String,
  description: String,
  color: String,
  image: Object,
  size: String,
  overview: Array,
  materials: Object,
  price: Number,
  amount: Number,
});

const Cart = mongoose.model("Cart", CartSchema, "cart");

export default Cart;
