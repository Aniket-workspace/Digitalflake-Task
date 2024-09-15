import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  product: {
    type: String,
  },
  image: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  category: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

export default mongoose.model("products", productSchema);
