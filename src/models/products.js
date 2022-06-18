import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  quantityTotal: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.models.produtos || mongoose.model("produtos", schema);
