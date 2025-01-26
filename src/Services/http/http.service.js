import { API_TIME_OUT, BASE_URL } from "./http.config";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIME_OUT,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})
export const getAuthConfig = () => {
    const token = Cookies.get("authToken");
    return {
        headers: {
            Authorization: token,
        }
    }
}

export const getRequest = (url, params = {}, config = {}) => {
    return axiosInstance.get(url, params, config )
}
// export const getRequest = async (url, config = {}) => {
//     try {
//         const response = await axiosInstance.get(url, config);
//         return handleResponse(response);
//     }
//     catch (err) {
//         return handleError(err);
//     }
// }

export const postRequest = (url, data = {}, config = {}) => {
    return axiosInstance.post(url, data, config)
}
export const putRequest = (url, data = {}, config = {}) => {
    return axiosInstance.put(url, data, config)
}
export const patchRequest = (url, data = {}, config = {}) => {
    return axiosInstance.patch(url, data, config)
}
export const deleteRequest = (url, config = {}) => {
    return axiosInstance.delete(url, config)
}