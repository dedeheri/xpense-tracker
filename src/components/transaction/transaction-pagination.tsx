"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQueryHandler } from "@/hooks/use-query";

interface TransactionPaginationProps {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
const TransactionPagination: React.FC<TransactionPaginationProps> = ({
  currentPage,
  totalItems,
}) => {
  const { handleSetQuery } = useQueryHandler();

  return (
    <Pagination className="pt-5 flex justify-end">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() =>
                handleSetQuery("page", (currentPage - 1).toString())
              }
            />
          </PaginationItem>
        )}

        {/* {[...Array(totalItems)].map((_: number, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className="cursor-pointer"
              isActive={currentPage === index + 1}
              onClick={() => handleSetQuery("page", (index + 1).toString())}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))} */}

        {currentPage < totalItems && (
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() =>
                handleSetQuery("page", (currentPage + 1).toString())
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default TransactionPagination;
