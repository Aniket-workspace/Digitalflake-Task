import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  id: {
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

export default mongoose.model("category", categorySchema);
