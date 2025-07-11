import { PaginationMeta } from "@/types/search/response/PaginationResponse";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React, { FC } from "react";

interface PaginationProps {
  paginationMeta?: PaginationMeta;
  isLoading?: boolean;
  numberNarest?: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: FC<PaginationProps> = ({
  paginationMeta,
  isLoading,
  numberNarest = 1,
  onPageChange,
}) => {
  if (isLoading) {
    return (
      <Pagination className="mt-4 mb-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem className="mx-4">
            <PaginationLink>Loading...</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
  return (
    <Pagination className="mt-4 mb-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={paginationMeta?.hasPrevious ? "" : "hidden"}
            onClick={() =>
              paginationMeta &&
              paginationMeta.hasPrevious &&
              onPageChange(paginationMeta.page - 1)
            }
          />
        </PaginationItem>
        {paginationMeta &&
          Array.from(
            {
              length:
                paginationMeta.totalPages === 0
                  ? 1
                  : paginationMeta.totalPages!,
            },
            (_, i) => i + 1
          ).map((page) => {
            const isFirst = page === 1 && numberNarest > 0;
            const isLast =
              page === paginationMeta.totalPages && numberNarest > 0;
            const isCurrent = page === paginationMeta.page;
            const isNearCurrent =
              Math.abs(page - paginationMeta.page) <= numberNarest;

            if (isFirst || isLast || isCurrent || isNearCurrent) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={isCurrent}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            if (
              numberNarest > 0 &&
              (page === paginationMeta.page - numberNarest + 1 ||
                page === paginationMeta.page + numberNarest + 1)
            ) {
              return (
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return null;
          })}
        <PaginationItem>
          <PaginationNext
            className={paginationMeta?.hasNext ? "" : "hidden"}
            onClick={() =>
              paginationMeta?.hasNext && onPageChange(paginationMeta.page + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
