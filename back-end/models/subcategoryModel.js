import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  id: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

export default mongoose.model("subcategory", subcategorySchema);
