import React, { useContext } from "react";
import { deleteProduct } from "../api/productApi";
import { MyStore } from "../context/AuthContext";
import { useNavigate } from "react-router";

const ProductCard = ({ product, onUpdate, onDelete }) => {
  const navigate = useNavigate();

  const { accessToken } = useContext(MyStore);

  const handleDelete = async () => {
    const response = await deleteProduct(accessToken, product._id);
    onDelete(product._id);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-800 sm:h-52">
        <img
          src={product.image.url}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-white">
          {product.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-5 text-zinc-400">
          {product.description}
        </p>

        {/* Actions */}
        <div className="mt-auto space-y-2 pt-5">
          {/* View Details */}
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            type="button"
            className="w-full rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-white active:scale-[0.98]"
          >
            View Details
          </button>

          {/* Update + Delete */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onUpdate(product)}
              className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-700 active:scale-[0.98]"
            >
              Update
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-800 hover:bg-red-950/60 active:scale-[0.98]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
