"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useRepositorySearchParams } from "../repository-search-params"

type Props = {
  totalCount: number
}

export function RepositoryPagination({ totalCount }: Props) {
  const { repositorySearchParams, setRepositorySearchParams } =
    useRepositorySearchParams()

  const currentPage = repositorySearchParams.page
  const perPage = repositorySearchParams.perPage
  const totalPages = Math.ceil(totalCount / perPage)

  if (totalPages <= 1) return null

  function handlePageChange(page: number) {
    setRepositorySearchParams({
      ...repositorySearchParams,
      page,
    })
  }

  function renderPageLinks() {
    const pages = []
    const buffer = 2

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - buffer && i <= currentPage + buffer)
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(i)
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      } else if (
        i === currentPage - buffer - 1 ||
        i === currentPage + buffer + 1
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }
    }

    return pages
  }

  return (
    <Pagination className="mt-8 flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) handlePageChange(currentPage - 1)
            }}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {renderPageLinks()}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) handlePageChange(currentPage + 1)
            }}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
