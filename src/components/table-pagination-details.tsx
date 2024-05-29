import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useMemo, useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { DEFAULT_PAGE_SIZES } from '@/lib/constant.ts'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from './ui/pagination'
import PaginationGroup from '@/components/pagination-group.tsx'

interface TablePaginationDetailProps<TData> {
  data: TData[]
  table: Table<TData>
  pageSizes?: number[]
}

export default function TablePaginationDetail<TData>({
  table,
  pageSizes = DEFAULT_PAGE_SIZES,
  ...props
}: TablePaginationDetailProps<TData>) {
  let paginationButtons: unknown[] = []
  const totalPages = table.getPageCount()
  const groupPageLimit: number = 3
  const pageGroups: unknown[] = []
  for (let i = 0; i < totalPages; i++) {
    if (i > 0 && i % groupPageLimit === 0) {
      paginationButtons.push(
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>,
      )
      pageGroups.push(paginationButtons)
      paginationButtons = []
    }

    paginationButtons.push(
      <PaginationItem key={i}>
        <PaginationLink
          href="#"
          onClick={() => table.setPageIndex(i)}
          isActive={i === table.getState().pagination.pageIndex}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>,
    )
  }

  if (paginationButtons.length > 0) {
    if (pageGroups.length > 0) {
      paginationButtons.unshift(
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>,
      )
      pageGroups.push(paginationButtons)
      paginationButtons = []
    }
  }

  const getCurrentPaginationGroup = () => {
    console.log('pageGroups', pageGroups)
    for (const i in pageGroups) {
      if (
        pageGroups[i].findIndex(
          (u) => u.key === String(table.getState().pagination.pageIndex),
        ) !== -1
      ) {
        return pageGroups[i]
      }
    }
  }

  // const [currentPageIndex, setCurrentPageIndex] = useState(0)
  // const currentGroupStartIndex = currentPageIndex * 10 * 3
  // const currentGroupEndIndex = Math.min(currentGroupStartIndex + 10 * 3, 100)
  // const displayedItems = data.slice(
  //   currentGroupStartIndex,
  //   currentGroupEndIndex,
  // )

  // const pageCount = table.getPageCount()
  // console.log('pageCount', pageCount)
  // const getPageNumbers = useMemo(() => {
  //   // const totalPages = Math.ceil(
  //   //   table.getRowCount() / table.getState().pagination.pageSize,
  //   // )
  //   // console.log('totalPages', totalPages)
  //   const listPages = Array.from({ length: pageCount }, (_, i) => i + 1)
  // return Array.from({ length: Math.ceil(listPages.length / 3) }, (_, i) =>
  //   listPages.slice(i * 3, (i + 1) * 3),
  // )
  // }, [pageCount])
  // console.log('getPageNumbers', getPageNumbers)
  //

  return (
    <div
      className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8"
      {...props}
    >
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizes.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <PaginationGroup totalPages={totalPages} table={table} />
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
