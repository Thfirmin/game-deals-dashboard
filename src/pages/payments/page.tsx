import { columns, type Payment } from "./columns"
import { DataTable } from "./data-table"


export default function DemoPage() {
  const data: Payment[] = [
	{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
	{
      id: "828ed52f",
      amount: 100,
      status: "failed",
      email: "m2@example.com",
    },
	{
      id: "928ed52f",
      amount: 100,
      status: "success",
      email: "m3@example.com",
    },
  ]

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}