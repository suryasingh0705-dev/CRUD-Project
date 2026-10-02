import api from "../api/api.jsx"

export const getAllProducts = async (accessToken) => {
  const response = await api.get("/product", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const createProduct = async (accessToken, formData) => {
  const response = await api.post("/product", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const deleteProduct = async (accessToken, productId) => {
  const response = await api.delete(`/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
}

export const updateProduct = async (accessToken, productId, formData) => {
  const response = await api.patch(`/product/${productId}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const getProductById = async (accessToken, productId) => {
  const response = await api.get(`/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};