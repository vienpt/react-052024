import { ColumnDef } from '@tanstack/react-table'
import { Post } from '@/lib/interface.ts'

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
  }
]