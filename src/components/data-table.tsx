import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { cn } from '@/lib/utils.ts'
import { HTMLAttributes, ReactNode, useState } from 'react'
import TablePagination from '@/components/table-pagination.tsx'
import { DEFAULT_PAGE_SIZE } from '@/lib/constant.ts'

interface DataTableProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
  /**
   * The columns represent for showing data header
   * @default []
   * @type ColumnDef<TData> | []
   * @example <DataTable columns={columns} />
   */
  columns: ColumnDef<TData, TValue>[]

  /**
   * The data represent from list of data for rendering on table
   * @default []
   * @type TData[]
   * @example <DataTable data={data} />
   */
  data: TData[]

  /**
   * The pagination represent for showing pagination, allow custom size filter
   */
  pagination: {
    show: boolean
    sizes?: number[]
    state?: {
      pageIndex: number
      pageSize: number
    }
  }

  /**
   * The page count represent show total page in data table.
   */
  pagecount?: number

  /**
   * custom class name
   */
  className?: string

  /**
   * custom on top of table
   */
  children?: ReactNode

  //  render?: ({
  //    pageSize,
  //    pageIndex,
  //  }: {
  //    pageSize: number
  //    pageIndex: number
  //  }) => ReactElement
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  className,
  children,
  ...props
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>(
    props.pagination.state ?? { pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE },
  )
  const table = useReactTable({
    data,
    columns,
    pageCount: props.pagecount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
    },
  })

  return (
    <div
      className={cn('w-full space-y-2.5 overflow-auto', className)}
      {...props}
    >
      {children}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {props.pagination.show && (
        <div className="flex flex-col gap-2.5">
          <TablePagination table={table} pageSizes={props.pagination.sizes} />
        </div>
      )}
      {/*{props.render(pagination)}*/}
    </div>
  )
}
