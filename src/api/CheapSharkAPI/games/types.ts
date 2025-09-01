export type GameListParams = {
  title: string,
  steamAppID?: number,
  limit?: number,
  exact?: boolean
};

export type GameListResponse = {
  gameID: string,
  steamAppID: string | null,
  cheapest: string,
  cheapestDealID: string,
  external: string,
  internalName: string,
  thumb: string
};

export type GameLookupParams = {
  id: string
};

export type GameLookupResponse = {
  info: {
    title: string,
    steamAppID?: string,
    thumb: string
  },
  cheapestPriceEver: {
    price: string,
    date: number
  },
  deals: {
    storeID: string,
    dealID: string,
    price: string,
    retailPrice: string,
    savings: string
  }[],
};

export type GameMultipleLookupParams = {
  ids: string[],
  format?: "array"
};

export type GameLookupResponseArrayVersion = {
  info: {
    gameID: string,
    title: string,
    steamAppID?: string,
    thumb: string
  },
  cheapestPriceEver: {
    price: string,
    date: number
  },
  deals: {
    storeID: string,
    dealID: string,
    price: string,
    retailPrice: string,
    savings: string
  }[],
};

export type GameMultipleLookupResponse = Record<string, GameLookupResponse> | GameLookupResponseArrayVersion[];