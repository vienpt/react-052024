import { ColumnDef } from '@tanstack/react-table'
import TableColumnActions, {
  UniqueColumnItem,
} from '@/components/table-column-action.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ArrowUpDown } from 'lucide-react'

export interface Task extends UniqueColumnItem {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const tasks: Task[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
]

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          className={'flex items-center ml-auto'}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          💸Amount
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return <div className={'text-right font-medium'}>{formatter}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original
      const dataItem = task as Task

      return <TableColumnActions dataItem={dataItem} />
    },
  },
]
