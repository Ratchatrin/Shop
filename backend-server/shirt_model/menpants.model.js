import mongoose, { Schema } from "mongoose";

const MenPantsSchema = Schema({
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

const MenPants = mongoose.model("MenPants", MenPantsSchema, "man pants");

export default MenPants;
