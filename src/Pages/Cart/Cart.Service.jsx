import { CART_URL, SUCCESS } from "../../Services/http/http.config";
import {
  deleteRequest,
  getAuthConfig,
  getRequest,
  postRequest,
  putRequest,
} from "../../Services/http/http.service";

export const getCartList = async () => {
  try {
    const { data, status } = await getRequest(CART_URL, getAuthConfig());
    if (status === SUCCESS) {
      return data;
    }
    return status === SUCCESS ? data : [];
  } catch (err) {
    console.log("Error fetching products:", err);
  }
};
export const addProductToCart = async (payload) => {
  try {
    const { data, status } = await postRequest(
      CART_URL,
      payload,
      getAuthConfig()
    );
    if (status === SUCCESS) {
      return data;
    }
    return status === SUCCESS ? data : [];
  } catch (err) {
    console.log("Error fetching products:", err);
  }
};
export const updateProductInCart = async (productId, quantity) => {
  try {
    const { data, status } = await putRequest(
      `${CART_URL}/${productId}`,
      quantity,
      getAuthConfig()
    );
    if (status === SUCCESS) {
      return data;
    }
    return status === SUCCESS ? data : [];
  } catch (err) {
    console.log("Error fetching products:", err);
  }
};
export const deleteCartProduct = async (productId) => {
  try {
    const { data, status } = await deleteRequest(
      `${CART_URL}/${productId}`,
      getAuthConfig()
    );
    if (status === SUCCESS) {
      return data;
    }
    return status === SUCCESS ? data : [];
  } catch (err) {
    console.log("Error fetching products:", err);
  }
};
export const clearCartProduct = async () => {
  try {
    const { data, status } = await deleteRequest(CART_URL, getAuthConfig());
    if (status === SUCCESS) {
      return data;
    }
    return status === SUCCESS ? data : [];
  } catch (err) {
    console.log("Error fetching products:", err);
  }
};
