import './style.css'
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import Text from '../Text'
import type { UseStateReturn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  selectedDeal: UseStateReturn<string>;
  data: TData[],
  columns: ColumnDef<TData, TValue>[]
}

export default function DataTable<TData, TValue>({
  selectedDeal,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-md border border-(--text-70)">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(
            (headerGroup) => (
              <TableRow className='border-(--text-70)' key={headerGroup.id}>
                {headerGroup.headers.map(
                  (header) => {
                    return (
                      <TableHead className='text-(--text-70)' key={header.id}>
                        {
                          header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                          )
                        }
                      </TableHead>
                    )
                  }
                )}
              </TableRow>
            )
          )}
        </TableHeader>

        <TableBody>
          {
            table.getRowModel().rows?.length
            ? (
              table.getRowModel().rows.map(
                (row) => (
                  <TableRow onClick={() => selectedDeal.set(row.original.dealID)} className='text-(--text-70) hover:bg-(--secondary) hover:text-(--text-100) hover:cursor-pointer' key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map(
                      (cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                )
              )
            )
            : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Text.Body>No data available</Text.Body>
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}