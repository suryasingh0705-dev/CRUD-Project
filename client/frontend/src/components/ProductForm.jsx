import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { MyStore } from "../context/AuthContext";
import { createProduct, updateProduct } from "../api/productApi";

const ProductForm = ({ product, onUpdate }) => {
  const { accessToken, setEditingProduct } = useContext(MyStore);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

const handleFormSubmit = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);

  if (data.image?.[0]) {
    formData.append("image", data.image[0]);
  }

  try {
    let response;

    if (product) {
      response = await updateProduct(
        accessToken,
        product._id,
        formData
      );
      onUpdate(response.data);
    } else {
      response = await createProduct(
        accessToken,
        formData
      );
    }

    reset();
    setEditingProduct(null);
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
      });
    } else {
      reset({
        title: "",
        description: "",
      });
    }
  }, [product, reset]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Create Product</h2>

          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              navigate("/");
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter product title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters",
                },
              })}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />

            {errors.title && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Description
            </label>

            <textarea
              rows="4"
              placeholder="Enter product description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Description cannot exceed 500 characters",
                },
              })}
              className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />

            {errors.description && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: product ? false : "Product image is required",
                validate: {
                  fileSize: (files) => {
                    const file = files?.[0];

                    if (!file) return true;

                    return (
                      file.size <= 1024 * 1024 ||
                      "Image size must be less than 1 MB"
                    );
                  },
                },
              })}
              className="w-full cursor-pointer rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-zinc-900 hover:file:bg-white"
            />

            {errors.image && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                navigate("/");
              }}
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-white active:scale-[0.98]"
            >
              {product ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
