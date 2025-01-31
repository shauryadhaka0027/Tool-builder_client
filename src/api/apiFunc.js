import axios from "axios";
import { ApiUrl } from "./apiRoutes";


export const apiUrl = import.meta.env.VITE_API;
console.log(apiUrl)

export const fetchApi = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});




class FetchData {

  async auth(data) {
    try {
      const response = await fetchApi.post(ApiUrl.AUTH.AUTHENTICATION, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }


  async genrateCode(data) {
    try {
      const response = await fetchApi.post(ApiUrl.GENERATED_CODE_BY_AI.GENERATED_CODE, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

}

export default new FetchData();
