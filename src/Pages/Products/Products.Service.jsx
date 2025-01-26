import { getRequest } from "../../Services/http/http.service";
import { PRODUCT_URL, SUCCESS } from "../../Services/http/http.config";

export const getProductList = async () => {
  try {
    const { data, status } = await getRequest(PRODUCT_URL);
    if (status === SUCCESS) {
      return data;
    }
    return status === SUCCESS ? data : [];
  } catch (err) {
    console.log("Error fetching products:", err);
  }
};
