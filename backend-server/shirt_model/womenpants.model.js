import mongoose, { Schema } from "mongoose";

const WomenPantsSchema = Schema({
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

const WomenPants = mongoose.model(
  "WomenPants",
  WomenPantsSchema,
  "women pants"
);

export default WomenPants;
