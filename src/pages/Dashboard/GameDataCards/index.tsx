import "./style.css";
import type { DealListResponse } from "@/api/CheapSharkAPI/deals/types";
import type { StoreResponse } from "@/api/CheapSharkAPI/stores/types";
import { UseState, type UseStateReturn } from "@/lib/utils";
import { useEffect, type RefObject } from "react";
import GameCard from "@/components/GameCard";
import Text from "@/components/Text";
import SkeletonLoaderCardsBody from "./skeleton";

interface GameDataCardsProps {
  selectedDeal: UseStateReturn<string>;
  dealData: UseStateReturn<DealListResponse[]>;
  storeData: UseStateReturn<StoreResponse[]>;
  currency: UseStateReturn<string>;
  locale: RefObject<string>;
  exchangeRate: RefObject<Record<string, number>>;
}

type GameData = {
    dealID: string;
    title: string;
    actualPrice: number;
    originalPrice: number;
    discountPercent: number;
    store: string;
    storeLogoUrl: string;
    imgUrl: string;
    dealRating: number;
}

export default function GameDataCards({
  selectedDeal,
  dealData,
  storeData,
  currency,
  locale,
  exchangeRate
}: GameDataCardsProps) {
  const loading: UseStateReturn<boolean> = UseState<boolean>(true)
  const gameData: UseStateReturn<GameData[]> = UseState<GameData[]>([])
  
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
                  imgUrl: deal.thumb,
                  actualPrice: parseFloat(deal.salePrice),
                  originalPrice: parseFloat(deal.normalPrice),
                  discountPercent: parseFloat(deal.savings).toFixed(2) as unknown as number,
                  store: store ? store.storeName : "Unknown Store",
                  storeLogoUrl: store ? ("https://www.cheapshark.com" + store.images.logo) : "",
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
    <div className="data-container-cards">
      {
        loading.get()
          ? <SkeletonLoaderCardsBody rows={60} columns={6} />
          : (
            gameData.get().length > 0
              ? (
                gameData.get().map(
                  (game, index) => (
                    <GameCard
                      key={index}
                      onClick={(dealID) => selectedDeal.set(dealID)}
                      dealID={game.dealID}
                      title={game.title}
                      imageUrl={game.imgUrl}
                      actualPrice={
                        new Intl.NumberFormat(
                          locale.current, {
                            style: "currency",
                            currency: currency.get(),
                          }
                        ).format(
                          parseFloat(
                            (game.actualPrice * (exchangeRate.current[currency.get()] || 1)).toFixed(2)
                          )
                        )
                      }
                      originalPrice={
                        new Intl.NumberFormat(
                          locale.current, {
                            style: "currency",
                            currency: currency.get(),
                          }
                        ).format(
                          parseFloat(
                            (game.originalPrice * (exchangeRate.current[currency.get()] || 1)).toFixed(2)
                          )
                        )
                      }
                      discount={`${game.discountPercent}%`}
                      rating={`${game.dealRating}`}
                      storeLogoUrl={game.storeLogoUrl}
                    />
                  )
                )
              )
              : <Text.Body>No data available.</Text.Body>
          )
      }
    </div>
  )
}