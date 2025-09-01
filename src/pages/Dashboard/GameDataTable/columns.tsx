import type { UseStateReturn } from "@/lib/utils";
import type { RefObject } from "react";

export type GameData = {
  dealID: string;
  title: string;
  actualPrice: number;
  originalPrice: number;
  discountPercent: number;
  store: string;
  dealRating: number;
}

export function dynamicColumns(currency: UseStateReturn<string>, locale: RefObject<string>, exchangeRate: RefObject<Record<string, number>>) {
  return [
    {
      accessorKey: "title",
      header: () => <div className="text-center text-lg font-bold">Title</div>,
      cell: ({ row }) => {
        const title = row.getValue("title");
        return <div className="text-start">{title}</div>;
      },
    },
    {
      accessorKey: "actualPrice",
      header: () => (
        <div className="text-center text-lg font-bold">Actual Price</div>
      ),
      cell: ({ row }) => {
        const money = parseFloat(row.getValue("actualPrice")) * (exchangeRate.current[currency.get()] || 1);
        const formattedMoney = new Intl.NumberFormat(locale.current, {
          style: "currency",
          currency: currency.get(),
        }).format(money);
        return <div className="text-center">{formattedMoney}</div>;
      },
    },
    {
      accessorKey: "originalPrice",
      header: () => (
        <div className="text-center text-lg font-bold">Original Price</div>
      ),
      cell: ({ row }) => {
        const money = parseFloat(row.getValue("originalPrice")) * (exchangeRate.current[currency.get()] || 1);
        const formattedMoney = new Intl.NumberFormat(locale.current, {
          style: "currency",
          currency: currency.get(),
        }).format(money);
        return <div className="text-center">{formattedMoney}</div>;
      },
    },
    {
      accessorKey: "discountPercent",
      header: () => (
        <div className="text-center text-lg font-bold">Discount %</div>
      ),
      cell: ({ row }) => {
        const discount = row.getValue("discountPercent");
        return <div className="text-center">{discount}%</div>;
      },
    },
    {
      accessorKey: "store",
      header: () => <div className="text-center text-lg font-bold">Store</div>,
      cell: ({ row }) => {
        const store = row.getValue("store");
        return <div className="text-start">{store}</div>;
      },
    },
    {
      accessorKey: "dealRating",
      header: () => <div className="text-center text-lg font-bold">Rating</div>,
    },
  ];
} 