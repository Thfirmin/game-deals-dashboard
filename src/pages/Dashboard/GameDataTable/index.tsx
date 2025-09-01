import DataTable from "@/components/DataTable"
import { dynamicColumns, type GameData } from "./columns"
import { useEffect, type RefObject } from "react"
import type { DealListResponse } from "@/api/CheapSharkAPI/deals/types";
import type { StoreResponse } from "@/api/CheapSharkAPI/stores/types";
import { UseState, type UseStateReturn } from "@/lib/utils";
import SkeletonLoaderTableBody from "./skeleton";

interface GameDataTableProps {
  selectedDeal: UseStateReturn<string>;
  dealData: UseStateReturn<DealListResponse[]>;
  storeData: UseStateReturn<StoreResponse[]>;
  currency: UseStateReturn<string>;
  locale: RefObject<string>;
  exchangeRate: RefObject<Record<string, number>>;
}

export default function GameDataTable({
  selectedDeal,
  dealData,
  storeData,
  currency,
  locale,
  exchangeRate
}: GameDataTableProps) {
  const loading: UseStateReturn<boolean> = UseState<boolean>(true)
  const gameData: UseStateReturn<GameData[]> = UseState<GameData[]>([])

  const columns = dynamicColumns(currency, locale, exchangeRate)
  
  useEffect(
    () => {
      async function fetching() {
        try {
          gameData.set(
            dealData.get().map(
              (deal) => {
                const store = storeData.get().find((s) => s.storeID === deal.storeID)
                return {
                  dealID: deal.dealID,
                  title: deal.title,
                  actualPrice: parseFloat(deal.salePrice),
                  originalPrice: parseFloat(deal.normalPrice),
                  discountPercent: parseFloat(deal.savings).toFixed(2) as unknown as number,
                  store: store ? store.storeName : "Unknown Store",
                  dealRating: parseFloat(deal.dealRating)
                }
              }
            )
          )
        }
        catch (error) {
          console.error("Error in useEffect fetching stores:", error)
        }
        finally {
          loading.set(false)
        }
      }

      fetching()
    },
    []
  )

  return (
    <div className="data-container-table min-w-[50%]">
      {
        loading.get()
          ? <SkeletonLoaderTableBody rows={60} columns={6} />
          : <DataTable
              data={gameData.get()}
              columns={columns}
              selectedDeal={selectedDeal}
            />
      }
    </div>
  )
}