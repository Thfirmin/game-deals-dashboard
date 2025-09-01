import Button from '@/components/Button';
import './style.css'
import Input from "@/components/FormInputs/Input";
import Select from "@/components/FormInputs/Select";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import RangeInput from '@/components/FormInputs/RangeInput';
import type { StoreResponse } from '@/api/CheapSharkAPI/stores/types';

const searchSchema = z.object({
  filterStore: z.string().optional(),
  filterPriceRange: z.string().optional(),
  filterMinDiscount: z.string().optional(),
  sortBy: z.enum(['Price', 'Deal Rating', 'Savings', '']),
  searchTitle: z.string().optional(),
}).refine((data) => {
  if (data.filterMinDiscount) {
    const num = Number(data.filterMinDiscount);
    return !isNaN(num) && num >= 0 && num <= 100;
  }
  return true;
});

export type SearchData = {
  filterStore?: string | undefined;
  filterPriceRange?: string | undefined;
  filterMinDiscount?: number | undefined;
  sortBy?: "Deal Rating" | "Price" | "Savings" | "";
  searchTitle?: string | undefined;
};

export type SearchPanelProps = {
  onSubmit: (data: SearchData) => void;
  currency?: string;
  stores?: StoreResponse[];
}

export default function SearchPanel({ onSubmit, currency = "USD", stores = [] }: SearchPanelProps) {
  const currencyTable = { USD: "$", BRL: "R$", EUR: "€" };
  if (!currencyTable[currency as keyof typeof currencyTable]) currency = "USD";

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      filterStore: '',
      filterPriceRange: '',
      filterMinDiscount: '',
      sortBy: '',
      searchTitle: '',
    },
  });

  function onSubmitHandler(data: z.infer<typeof searchSchema>) {
    const sanitizedData = {
      filterStore: data.filterStore,
      filterPriceRange: data.filterPriceRange,
      filterMinDiscount: Number(data.filterMinDiscount),
      sortBy: data.sortBy,
      searchTitle: data.searchTitle,
    }
    onSubmit(sanitizedData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="form-container">
        <FormField
          control={form.control}
          name="searchTitle"
          render={({ field }) => (
            <Input
              {...field}
              label={{ value: "Search by title:", align: 'top', justify: 'center' }}
              placeholder="Search by title..."
              id={field.name}
            />
          )}
        />
        <div className='w-full grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name="filterStore"
            render={({ field }) => (
              <Select
                {...field}
                label={{ value: "Filter by store:", align: 'top', justify: 'center' }}
                id={field.name}
                placeholder='All stores'
                options={
                  stores
                    ? stores.map((store) => ({ label: store.storeName, value: store.storeID }))
                    : []
                }
              />
            )}
          />
          <FormField
            control={form.control}
            name="filterMinDiscount"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Min Discount"
                label={{ value: "Minimum Discount (%):", align: 'top', justify: 'start' }}
                id={field.name}
              />
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="filterPriceRange"
          render={({ field }) => (
            <RangeInput
              {...field}
              min={0}
              max={50}
              start={[0, 50]}
              label={{ value: "Filter by price range:", align: 'top', justify: 'center' }}
              legendPrefix={currencyTable[currency as keyof typeof currencyTable]}
            />
          )}
        />
        <div className='w-full grid grid-cols-2 gap-4 items-end'>
          <FormField
            control={form.control}
            name="sortBy"
            render={({ field }) => (
              <Select
                {...field}
                label={{ value: "Sort by:", align: 'left', justify: 'center' }}
                id={field.name}
                placeholder='Default'
                options={[
                  { label: "Price", value: "Price" },
                  { label: "Rating", value: "Deal Rating" },
                  { label: "Savings", value: "Savings" },
                ]}
              />
            )}
          />
          <Button type='submit'>Search</Button>
        </div>
      </form>
    </Form>
  );
}