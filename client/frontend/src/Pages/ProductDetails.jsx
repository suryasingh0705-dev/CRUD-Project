import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MyStore } from "../context/AuthContext";
import { getProductById } from "../api/productApi";

const ProductDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { accessToken } = useContext(MyStore);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(accessToken, id);

        setProduct(response.data.product);
      } catch (error) {
        console.log(error);
      }
    };

    if (accessToken && id) {
      fetchProduct();
    }
  }, [accessToken, id]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        Loading product...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Product Image */}
            <div className="flex min-h-[320px] items-center justify-center bg-zinc-950 p-6 sm:p-10 lg:min-h-[550px]">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                <img
                  src={product.image.url}
                  alt={product.title}
                  className="h-full max-h-[500px] w-full object-contain p-6 transition duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <span className="mb-4 w-fit rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400">
                Product
              </span>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {product.title}
              </h1>

              <div className="my-6 h-px bg-zinc-800" />

              <div>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  Description
                </h2>

                <p className="text-base leading-7 text-zinc-300 sm:text-lg">
                  {product.description}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => navigate("/")}
                  type="button"
                  className="rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white active:scale-[0.98]"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
