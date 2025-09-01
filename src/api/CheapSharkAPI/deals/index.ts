import axios from "axios"
import type { DealListParams, DealListResponse, DealLookupParams, DealLookupResponse } from "./types"

const CheapSharkApiHost = import.meta.env.VITE_CHEAPSHARK_API_HOST

export async function fetchDealList(params: DealListParams): Promise<DealListResponse[]> {
  try {
    const response = await axios.get(`${CheapSharkApiHost}/deals`, { params })
    const totalPageNumber = response.headers['x-total-page-count'];
    return response.data.map(deal => ({ ...deal, totalPageNumber }))
  } catch (error) {
    console.error("Error fetching deals:", error)
    return []
  }
}

export async function fetchDealLookup(params: DealLookupParams): Promise<DealLookupResponse | null> {
  try {
    const response = await axios.get(`${CheapSharkApiHost}/deals`, { params })
    return response.data.length > 0 ? response.data[0] : null
  } catch (error) {
    console.error("Error fetching deal by ID:", error)
    return null
  }
}