import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 500,
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    fileId: {
      type: String,
      required: true,
    },
  },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
