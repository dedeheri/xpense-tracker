"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
