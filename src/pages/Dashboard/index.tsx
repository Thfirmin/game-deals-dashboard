import './style.css'
import GameDataTable from './GameDataTable'
import type { DealListResponse } from '@/api/CheapSharkAPI/deals/types'
import type { StoreResponse } from '@/api/CheapSharkAPI/stores/types'
import { UseState, type UseStateReturn } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import AwesomeAPI from '@/api/AwesomeAPI'
import GameDataCards from './GameDataCards'
import SearchPanel, { type SearchData } from './SearchPanel'
import Select from '@/components/FormInputs/Select'
import CheapSharkAPI from '@/api/CheapSharkAPI'
import SkeletonLoaderCardsBody from './GameDataCards/skeleton'
import SkeletonLoaderTableBody from './GameDataTable/skeleton'
import type { GameModalDataProp } from '@/components/GameModal'
import GameModal from '@/components/GameModal'
import Button from '@/components/Button'

export default function DashboardPage() {
  const loading: UseStateReturn<boolean> = UseState<boolean>(true)
  const dealData: UseStateReturn<DealListResponse[]> = UseState<DealListResponse[]>([])
  const storeData: UseStateReturn<StoreResponse[]> = UseState<StoreResponse[]>([])
  const selectedDeal = UseState<string>("None")
  const visibility = UseState<boolean>(false)
  const gameModalData = UseState<GameModalDataProp | null>(null)

  const localeTable: Record<'USD' | 'BRL' | 'EUR', string> = { USD: "en-US", BRL: "pt-BR", EUR: "fr-FR" };
  const currency = UseState<string>('USD')
  const locale = useRef<string>(localeTable[currency.get() as 'USD' | 'BRL' | 'EUR'])

  const exchangeRate = useRef<Record<string, number>>({ USD: 1, BRL: 1, EUR: 1 })
  const displayMode = UseState<"cards" | "table">(localStorage.getItem('displayMode') === 'table' ? 'table' : 'cards')

  const filterParamsRef = useRef<SearchData | null>(null)
  const pageNumberState = UseState<number>(0)
  const totalPages = UseState<number>(0)

  useEffect(() => {
    async function initInstance() {
      try {
        const aAPIresponse = await AwesomeAPI.currency("json/last/USD-BRL,USD-EUR")
        exchangeRate.current = {
          USD: 1,
          BRL: parseFloat(aAPIresponse.USDBRL.bid),
          EUR: parseFloat(aAPIresponse.USDEUR.bid)
        }
        console.log("Fetched exchange rates:", exchangeRate.current);

        const csResponse = await CheapSharkAPI.stores.list();
        storeData.set(csResponse);
        console.log("Fetched stores:", csResponse);

        const dealsResponse = await CheapSharkAPI.deals.list({ pageNumber: pageNumberState.get() });
        dealData.set(dealsResponse);
        totalPages.set((Number(dealsResponse[0]?.totalPageNumber) + 1) || 0);
        console.log("Fetched game data:", dealsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        loading.set(false)
      }
    }

    initInstance()
    selectNavItem()
  }, [])

  useEffect(() => {
    localStorage.setItem('displayMode', displayMode.get());
  }, [displayMode.get()]);

  useEffect(() => {
    locale.current = localeTable[currency.get() as 'USD' | 'BRL' | 'EUR'];
  }, [currency.get()]);

  useEffect(() => {
    if (selectedDeal.get() !== "None") {
      const deal = dealData.get().find(d => d.dealID === selectedDeal.get());
      const store = storeData.get().find(s => s.storeID === deal?.storeID);
      if (deal && store) gameModalData.set({ game: deal, store: store });
      visibility.set(true);
    } else {
      gameModalData.set(null);
      visibility.set(false);
    }
  }, [selectedDeal.get()]);

  useEffect(() => {
    async function fetchTotalPages() {
      await filterHandler(filterParamsRef.current, pageNumberState.get());
    }
    fetchTotalPages();
  }, [pageNumberState.get()]);

  async function filterHandler(data: SearchData | null, pageNumber: number = 0) {
    const filterParams = {
      title: data?.searchTitle || undefined,
      storeID: data?.filterStore || undefined,
      lowerPrice: Number(data?.filterPriceRange?.split(';')[0]) || 0,
      upperPrice: Number(data?.filterPriceRange?.split(';')[1]) || 50,
      sortBy: data?.sortBy || undefined,
    }
    
    filterParamsRef.current = data;

    try {
      loading.set(true);
      const response = await CheapSharkAPI.deals.list({
        ...filterParams,
        pageNumber
      });
      if (!isNaN(Number(data?.filterMinDiscount))) {
        const newResponse = response.filter(deal => Number(deal.savings) >= Number(data?.filterMinDiscount));
        dealData.set(newResponse);
        totalPages.set((Number(newResponse[0]?.totalPageNumber) + 1) || 0);
      } else {
        dealData.set(response);
        totalPages.set((Number(response[0]?.totalPageNumber) + 1) || 0);
      }
    } catch (error) {
      console.error("Error fetching filtered deals:", error);
    }
    finally {
      loading.set(false);
    }
  }

  return (
    <>
      <GameModal
        gameData={gameModalData.get()}
        isOpen={visibility}
        selectedDeal={selectedDeal}
      />
      <section className='mb-[50px]'>
        <h1 className='title mb-5'>Dashboard</h1>
        <p className='description max-w-[600px]'>Welcome to your personalized dashboard where you can track your game deals and find your ideal price.</p>
      </section>

      <div className='data_container flex flex-col items-center justify-center'>
        <SearchPanel
          onSubmit={filterHandler}
          currency={currency.get()}
          stores={storeData.get()}
        />

        <hr className='divisor' />

        <div className='mode-selector mb-[50px]'>
          {/* Currency */}
          <Select
            label={{ value: "Choose a currency:", align: "top" }}
            options={[
              { label: "USD", value: "USD" },
              { label: "BRL", value: "BRL" },
              { label: "EUR", value: "EUR" }
            ]}
            value={currency.get()}
            onChange={(e) => currency.set(e.target.value)}
            name="currency"
          />

          {/* Display mode */}
          <Select
            label={{ value: "Display mode:", align: "top" }}
            options={[
              { label: "Cards", value: "cards" },
              { label: "Table", value: "table" }
            ]}
            value={displayMode.get()}
            onChange={(e) => displayMode.set(e.target.value as "cards" | "table")}
            name="displayMode"
          />
        </div>
        
        {
          displayMode.get() === "cards"
            ? (
              loading.get()
              ? (<SkeletonLoaderCardsBody rows={60} columns={6} />)
              : (
                <GameDataCards
                  selectedDeal={selectedDeal}
                  dealData={dealData}
                  storeData={storeData}
                  currency={currency}
                  locale={locale}
                  exchangeRate={exchangeRate}
                />
              )
            )
            : (
              loading.get()
              ? (<SkeletonLoaderTableBody rows={60} columns={6} />)
              : (
                <GameDataTable
                  selectedDeal={selectedDeal}
                  dealData={dealData}
                  storeData={storeData}
                  currency={currency}
                  locale={locale}
                  exchangeRate={exchangeRate}
                />
              )
            )
        
        }
      </div>
      <div className='flex items-center justify-between gap-5 mt-[40px]'>
        <Button
          onClick={() => { pageNumberState.set(pageNumberState.get() - 1); }}
          disabled={pageNumberState.get() === 0}
        >
          Prev
        </Button>

        <div>{pageNumberState.get() + 1} of {totalPages.get()}</div>
        
        <Button
          onClick={() => { pageNumberState.set(pageNumberState.get() + 1); }}
          disabled={pageNumberState.get() === totalPages.get()}
        >
          Next
        </Button>
      </div>
    </>
  )
}

function selectNavItem() {
  const navDashboardItem = document.getElementById('nav-dashboard-item');
  if (navDashboardItem) {
    navDashboardItem.classList.add('nav__item__selected');
  }

  const navHomeItem = document.getElementById('nav-home-item');
  if (navHomeItem) {
    navHomeItem.classList.remove('nav__item__selected');
  }

  const navAboutItem = document.getElementById('nav-about-item');
  if (navAboutItem) {
    navAboutItem.classList.remove('nav__item__selected');
  }
}