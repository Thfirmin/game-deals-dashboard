import axios from "axios";
import type { CurrencyResponse } from "./types";

const AwesomeApiHost = import.meta.env.VITE_AWESOME_API_HOST;

export async function fetchData(endpoint: string): Promise<CurrencyResponse> {
  const cachedResponse = sessionStorage.getItem(`AwesomeAPI_${endpoint}`);
  if (cachedResponse) {
    return JSON.parse(cachedResponse);
  }
  try {
    const response = await axios.get(`${AwesomeApiHost}/${endpoint}`);
    sessionStorage.setItem(`AwesomeAPI_${endpoint}`, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const AwesomeAPI = {
  currency: fetchData,
};

export default AwesomeAPI;