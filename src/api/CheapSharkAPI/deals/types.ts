export type DealListParams = {
  storeID?: string,
  pageNumber?: number,
  pageSize?: number,
  sortBy?: "Deal Rating" | "Price" | "Savings" | "Title" | "Release" | "Metacritic" | "Reviews" | "Recent" | "Store",
  desc?: boolean,
  lowerPrice?: number,
  upperPrice?: number,
  metacritic?: number,
  steamRating?: number,
  maxAge?: number,
  steamAppID?: string,
  title?: string,
  exact?: boolean,
  AAA?: boolean,
  steamworks?: boolean,
  onSale?: boolean,
  output?: "json" | "xml"
};

export type DealListResponse = {
  totalPageNumber?: number,
  internalName: string,
  title: string,
  metacriticLink: string,
  dealID: string,
  storeID: string,
  gameID: string,
  salePrice: string,
  normalPrice: string,
  isOnSale: string,
  savings: string,
  metacriticScore: string,
  steamRatingText: string,
  steamRatingPercent: string,
  steamRatingCount: string,
  steamAppID: string,
  releaseDate: number,
  lastChange: number,
  dealRating: string,
  thumb: string
};

export type DealLookupParams = {
  id: string
};

export type DealLookupResponse = {
	gameInfo: {
		storeID: string,
		gameID: string,
		name: string,
		steamAppID: string,
		salePrice: string,
		retailPrice: string,
		steamRatingText: string,
		steamRatingPercent: string,
		steamRatingCount: string,
		metacriticScore: string,
		metacriticLink: string,
		releaseDate: number,
		publisher: string,
		steamworks: string,
		thumb: string
	},
	cheaperStores: {
		dealID: string,
		storeID: string,
		salePrice: string,
		retailPrice: string
	}[],
	cheapestPrice: {
		price: string,
		date: number
	}
}

