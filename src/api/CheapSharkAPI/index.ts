import { fetchDealList, fetchDealLookup } from "./deals";
import { fetchGameList, fetchGameLookup, fetchGameMultipleLookup } from "./games";
import { fetchLastChangedStores, fetchStores } from "./stores";

const CheapSharkAPI = {
  deals: {
    list: fetchDealList,
    lookup: fetchDealLookup
  },
  stores: {
    list: fetchStores,
    lastChanged: fetchLastChangedStores
  },
  game: {
    list: fetchGameList,
    lookup: fetchGameLookup,
    multipleLookup: fetchGameMultipleLookup
  }
}

export default CheapSharkAPI;