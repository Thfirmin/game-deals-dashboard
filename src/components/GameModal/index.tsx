import { formatMoney, UseState, type UseStateReturn } from '@/lib/utils'
import './style.css'
import type { DealListResponse, DealLookupResponse } from '@/api/CheapSharkAPI/deals/types'
import type { StoreResponse } from '@/api/CheapSharkAPI/stores/types'
import { MoveRight, X } from 'lucide-react'
import { useEffect } from 'react'
import CheapSharkAPI from '@/api/CheapSharkAPI'
import LoadingPage from '../LoadingPage'

export type GameModalDataProp = {
  game: DealListResponse,
  store: StoreResponse
};

export type GameModalProps = {
  isOpen: UseStateReturn<boolean>
  gameData: GameModalDataProp | null
  selectedDeal: UseStateReturn<string>
}

const defaultGameData: GameModalProps["gameData"] = {
  game: {
    internalName: "",
    title: "",
    metacriticLink: "",
    dealID: "",
    storeID: "",
    gameID: "",
    salePrice: "",
    normalPrice: "",
    isOnSale: "",
    savings: "",
    metacriticScore: "",
    steamRatingText: "",
    steamRatingPercent: "",
    steamRatingCount: "",
    steamAppID: "",
    releaseDate: 0,
    lastChange: 0,
    dealRating: "",
    thumb: "",
  },
  store: {
    storeID: "",
    storeName: "",
    isActive: 0,
    images: {
      banner: "",
      logo: "",
      icon: "",
    },
  },
};

export default function GameModal({ isOpen, gameData = defaultGameData, selectedDeal }: GameModalProps) {
  const complementarData = UseState<DealLookupResponse | null>(null);
  const loading = UseState<boolean>(false);

  useEffect(() => {
    async function fetchComplementarData() {
      if (!gameData) return;

      const response = await CheapSharkAPI.deals.lookup({ id: gameData.game.dealID });
      complementarData.set(response);
    }

    fetchComplementarData();
  }, []);

  if (!gameData) return null;

  return (
    <div className="game-modal" style={{ display: isOpen.get() ? 'flex' : 'none' }}>
      <div className="game-modal-content">
        {
          loading.get()
            ? <LoadingPage />
            : (<>
              <button className="game-modal-close" onClick={() => {
                isOpen.set(false);
                selectedDeal.set("None");
              }}>
                <X />
              </button>

              <div className='game-modal-body'>
                <section className='game-modal-header'>
                  <img src={gameData.game.thumb} alt={gameData.game.title} className='game-modal-image' />
                  <h2 className='game-modal-title'>{gameData.game.title}</h2>
                  <div className='flex flex-row items-center gap-2'>
                    <span className='game-modal-label'>Deal Rating:</span>
                    <span className='game-modal-deal-rating'>{gameData.game.dealRating}</span>
                  </div>
                </section>
                
                <hr className='game-modal-divider' />

                <section className='game-modal-prices'>
                  <div className='flex flex-row items-center gap-2'>
                    <span className='game-modal-label'>Prices:</span>
                    <span className='game-modal-original-price'>{formatMoney(gameData.game.normalPrice, "USD")}</span>
                    <MoveRight className='game-modal-arrow' />
                    <span className='game-modal-sale-price'>{formatMoney(gameData.game.salePrice, "USD")}</span>
                  </div>

                  <div className='flex flex-row items-center gap-2'>
                    <span className='game-modal-label'>Savings:</span>
                    <span className='game-modal-savings'>{"(" + parseFloat(gameData.game.savings).toFixed(2) + "%)"}</span>
                  </div>
                  
                  <div className='flex flex-row items-center gap-2'>
                    <span className='game-modal-label'>Historical Lowest Price:</span>
                    <span className='game-modal-lowest-price'>{formatMoney(complementarData.get()?.cheapestPrice.price || 0, "USD")}</span>
                  </div>
                </section>

                <hr className='game-modal-divider' />

                <section className='w-full flex flex-row items-center justify-center gap-4'>
                  <a target='_blank' href={`https://www.cheapshark.com/redirect?dealID=${gameData.game.dealID}`} className='flex flex-row items-center gap-2 hover:cursor-pointer hover:text-(--text-100)'>
                    <span className='game-modal-store-name'>Buy on {gameData.store.storeName}</span>
                    <img src={"https://www.cheapshark.com" + gameData.store.images.logo} alt={gameData.store.storeName} className='w-12 h-12' />
                  </a>
                </section>
              </div>
            </>)
        }
      </div>
    </div>
  )
}