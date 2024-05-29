import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination.tsx'
import { Table } from '@tanstack/react-table'
import { Fragment, useEffect, useState } from 'react'

interface PaginationGroupProps<TData> {
  totalPages: number
  table: Table<TData>
}

export default function PaginationGroup<TData>({
  totalPages,
  table,
}: PaginationGroupProps<TData>) {
  const [nextPageGroups, setNextPageGroup] = useState(0)

  const pageGroups = []
  for (let i: number = 0; i < totalPages; i++) {
    const pageIndex: number = Math.floor(i / 3)
    if (!pageGroups[pageIndex]) {
      pageGroups[pageIndex] = []
    }
    pageGroups[pageIndex].push(i) // Add page index to the current group
  }

  useEffect(() => {
    table.setPageIndex(nextPageGroups * 3)
  }, [nextPageGroups])

  // useEffect(() => {
  //   const nextPage = table.getState().pagination.pageIndex + 1
  //   console.log('next page', nextPage)
  //   if (nextPage > table.getState().pagination.pageIndex) {
  //     table.setPageIndex(nextPageGroups * 3)
  //   }

  //   // table.setPageIndex(nextPage - 1)
  // }, [])

  return (
    <PaginationContent>
      {pageGroups.map((pageGroup, groupIndex) => (
        <Fragment key={groupIndex}>
          {nextPageGroups === groupIndex && groupIndex > 0 && (
            <PaginationItem
              onClick={() => setNextPageGroup((prev) => prev - 1)}
            >
              <PaginationLink href="#">
                <PaginationEllipsis />
              </PaginationLink>
            </PaginationItem>
          )}
          {pageGroup.map((pageIndex) => (
            <Fragment key={pageIndex}>
              {nextPageGroups === groupIndex ? (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={() => {
                      table.setPageIndex(pageIndex)
                    }}
                    isActive={
                      pageIndex === table.getState().pagination.pageIndex
                    }
                  >
                    {pageIndex + 1}
                  </PaginationLink>
                </PaginationItem>
              ) : null}
            </Fragment>
          ))}
          {nextPageGroups === groupIndex &&
            groupIndex < pageGroups.length - 1 && (
              <PaginationItem
                onClick={() => setNextPageGroup((prev) => prev + 1)}
              >
                <PaginationLink href="#">
                  <PaginationEllipsis />
                </PaginationLink>
              </PaginationItem>
            )}
        </Fragment>
      ))}
    </PaginationContent>
  )
}
