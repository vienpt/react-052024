import { ColumnDef } from '@tanstack/react-table'
import { Post } from '@/lib/interface.ts'
import TableColumnActions from '@/components/table-column-action.tsx'

export const PostColumns: ColumnDef<Post>[] = [
  {
    accessorKey: 'userId',
    header: 'UserId'
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'body',
    header: 'Body'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const post = row.original

      return <TableColumnActions dataItem={post} pathName={'posts'}/>
    },
  }
]