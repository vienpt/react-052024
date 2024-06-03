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

const pagesPerGroup = 3

export default function PaginationGroup<TData>({
  totalPages,
  table,
}: PaginationGroupProps<TData>) {
  const [currentGroup, setCurrentGroup] = useState(0)
  const totalGroups = Math.ceil(totalPages / pagesPerGroup)
  const currentPageIndex = table.getState().pagination.pageIndex

  const pageGroups = Array.from({ length: totalGroups }, (_, groupIndex) =>
    Array.from(
      { length: pagesPerGroup },
      (_, pageIndex) => groupIndex * pagesPerGroup + pageIndex,
    ).filter((pageIndex) => pageIndex < totalPages),
  )

  useEffect(() => {
    table.setPageIndex(currentGroup * pagesPerGroup)
  }, [currentGroup, table])

  useEffect(() => {
    const newGroup = Math.floor(currentPageIndex / pagesPerGroup)
    setCurrentGroup(newGroup)
  }, [currentPageIndex])

  return (
    <PaginationContent>
      {pageGroups.map((pageGroup, groupIndex) => (
        <Fragment key={groupIndex}>
          {currentGroup === groupIndex && groupIndex > 0 && (
            <PaginationItem onClick={() => setCurrentGroup((prev) => prev - 1)}>
              <PaginationLink href="#" aria-label="Previous Page Group">
                <PaginationEllipsis />
              </PaginationLink>
            </PaginationItem>
          )}
          {currentGroup === groupIndex &&
            pageGroup.map((pageIndex) => (
              <PaginationItem key={pageIndex}>
                <PaginationLink
                  href="#"
                  onClick={() => table.setPageIndex(pageIndex)}
                  isActive={pageIndex === currentPageIndex}
                  aria-current={
                    pageIndex === currentPageIndex ? 'page' : undefined
                  }
                >
                  {pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          {currentGroup === groupIndex && groupIndex < totalGroups - 1 && (
            <PaginationItem onClick={() => setCurrentGroup((prev) => prev + 1)}>
              <PaginationLink href="#" aria-label="Next Page Group">
                <PaginationEllipsis />
              </PaginationLink>
            </PaginationItem>
          )}
        </Fragment>
      ))}
    </PaginationContent>
  )
}
