export type StoreResponse = {
  storeID: string,
  storeName: string,
  isActive: number,
  images: {
    banner: string,
    icon: string,
    logo: string
  }
}

export type LastChangedStoresResponse = Record<string, string>;