import axios from "axios"
import type { GameListParams, GameListResponse, GameLookupParams, GameLookupResponse, GameMultipleLookupParams, GameMultipleLookupResponse } from "./types"

const CheapSharkApiHost = import.meta.env.VITE_CHEAPSHARK_API_HOST

export async function fetchGameList(params: GameListParams): Promise<GameListResponse[]> {
  try {
    const response = await axios.get(`${CheapSharkApiHost}/games`, { params })
    return response.data
  } catch (error) {
    console.error("Error fetching games:", error)
    return []
  }
}

export async function fetchGameLookup(params: GameLookupParams): Promise<GameLookupResponse | null> {
  try {
    const response = await axios.get(`${CheapSharkApiHost}/games`, { params })
    return response.data.length > 0 ? response.data[0] : null
  } catch (error) {
    console.error("Error fetching game by ID:", error)
    return null
  }
}

export async function fetchGameMultipleLookup(params: GameMultipleLookupParams): Promise<GameMultipleLookupResponse | null> {
  try {
    const response = await axios.get(`${CheapSharkApiHost}/games`, { params })
    return response.data.length > 0 ? response.data[0] : null
  } catch (error) {
    console.error("Error fetching game by ID:", error)
    return null
  }
}