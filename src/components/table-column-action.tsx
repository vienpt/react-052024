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
import { UniqueColumnItem } from '@/lib/interface.ts'

interface TableColumnActionProps<TData extends UniqueColumnItem> {
  /**
   * The dataItem represent for row actions on table ...
   * @type TData as object
   */
  dataItem: TData

  /**
   * path item for redirect item
   */
  pathName?: string
}

export default function TableColumnActions<TData extends UniqueColumnItem>({
  dataItem,
  pathName,
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
          Copy item ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {pathName ? (
          <DropdownMenuItem
            onClick={() => navigate(`${dataItem.id}`, { replace: true })}
          >
            View item details
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
