import React, { useContext, useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi.jsx";
import { MyStore } from "../context/AuthContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductForm from "../components/ProductForm.jsx";

const Home = () => {
  const { accessToken, setEditingProduct, editingProduct } = useContext(MyStore);
  const [products, setProducts] = useState([]);

  const fetchProductsData = async () => {
    try {
      const data = await getAllProducts(accessToken);
      setProducts(data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchProductsData();
  }, [accessToken]);

  const removeProductFromState = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id),
    );
  };

  const handleUpdate = (product) => {
    setEditingProduct(product);
  };

  const updateProductInState = (updatedProduct) => {
  setProducts((prevProducts) =>
    prevProducts.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    )
  );
};

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={removeProductFromState}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
      {editingProduct && <ProductForm product={editingProduct} onUpdate={updateProductInState} />}
    </main>
  );
};

export default Home;
