import productModel from "../model/product.model.js";
import { deleteFile, uploadFile } from "../services/storage.service.js";

export const createProductController = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      message: "Image field cannot be empty",
    });
  }

  const response = await uploadFile({
    buffer: req.file.buffer,
    fileName: req.file.originalname,
  });

  const product = await productModel.create({
    title: req.body.title,
    description: req.body.description,
    image: {
      url: response.url,
      fileId: response.fileId,
    },
  });

  return res.status(201).json({
    message: "Product created successfully",
    data: product,
  });
};

export const getAllProductsController = async (req, res) => {
  const products = await productModel.find();

  res.status(200).json({
    message: "Products fetched successfully",
    data: {
      products,
    },
  });
};

export const deleteProductController = async (req, res) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  await deleteFile(product.image.fileId);

  await productModel.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    message: "Product deleted successfully",
  });
};

export const updateProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (req.body.title) {
      product.title = req.body.title;
    }

    if (req.body.description) {
      product.description = req.body.description;
    }

    if (req.file) {
      await deleteFile(product.image.fileId);

      const response = await uploadFile({
        buffer: req.file.buffer,
        fileName: req.file.originalname,
      });

      product.image = {
        url: response.url,
        fileId: response.fileId,
      };
    }

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update product",
    });
  }
};

export const getSingleProductController = async (req, res) => {

  const {id} = req.params

  const product = await productModel.findById(id)

  if(!product) {
    return res.status(404).json({
      message: "Product does not exists on this id"
    })
  }

  return res.status(200).json({
    message: "Product fetched",
    data: {
      product: product
    }
  })

}
