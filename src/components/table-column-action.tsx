import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate } from 'react-router-dom'

export interface UniqueColumnItem {
  [key: string]: unknown
}

interface TableColumnActionProps<TData extends UniqueColumnItem> {
  /**
   * The dataItem represent for row actions on table ...
   * @type TData as object
   */
  dataItem: TData
}

export default function TableColumnActions<TData extends UniqueColumnItem>({
  dataItem,
}: TableColumnActionProps<TData>) {
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(dataItem.id as string)}
        >
          Copy task ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate(`/tasks/${dataItem.id}`, { replace: true })}
        >
          View task details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
