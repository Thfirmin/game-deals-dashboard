import axios from "axios"
import type { LastChangedStoresResponse, StoreResponse } from "./types"

const CheapSharkApiHost = import.meta.env.VITE_CHEAPSHARK_API_HOST

export async function fetchStores(): Promise<StoreResponse[]> {
  if (sessionStorage.getItem("stores")) {
    return JSON.parse(sessionStorage.getItem("stores") || "[]")
  }
  try {
    const response = await axios.get(`${CheapSharkApiHost}/stores`)
    sessionStorage.setItem("stores", JSON.stringify(response.data))
    return response.data
  } catch (error) {
    console.error("Error fetching stores:", error)
    return []
  }
}

export async function fetchLastChangedStores(): Promise<LastChangedStoresResponse> {
  try {
    const response = await axios.get(`${CheapSharkApiHost}/stores`, { params: { lastChange: true } })
    return response.data
  } catch (error) {
    console.error("Error fetching stores:", error)
    return {}
  }
}