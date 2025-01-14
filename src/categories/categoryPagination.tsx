import { fetchCategories } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { queryConfigs } from "@/tanstackQueryConfigs/queryConfigs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PaginationSkeleton from "./paginationSkeleton";

type Props = {
  onPageChange: (page: number) => void;
};

export default function CategoryPagination({ onPageChange }: Props) {
  const [page, setPage] = useState(0);
  const [pageSize] = useState<number>(8);
  const { isPlaceholderData, data, isPending, isError, error, isFetching } =
    useQuery({
      ...queryConfigs,
      queryKey: ["categories", page, pageSize],
      queryFn: () => fetchCategories(page, pageSize),
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    onPageChange(page);
  }, [page]);

  return (
    <>
      {isFetching || isPending ? (
        <PaginationSkeleton />
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                variant={"ghost"}
                onClick={() => {
                  setPage((old) => Math.max(old - 1, 0));
                }}
              ></PaginationPrevious>
            </PaginationItem>
            <PaginationItem>
              <Button>{data.pageNumber + 1}</Button>
            </PaginationItem>

            {}
            {[...Array(Math.min(3, data.totalPages))].map((_, i) => {
              const pageNumber = data.pageNumber + i + 1;
              if (pageNumber < data.totalPages - 1)
                return (
                  <PaginationItem key={pageNumber}>
                    <Button
                      onClick={() => setPage(pageNumber)}
                      variant={"ghost"}
                    >
                      {pageNumber + 1}
                    </Button>
                  </PaginationItem>
                );
              return null;
            })}
            {data.totalPages - 1 > data.pageNumber ? (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <Button
                    onClick={() => {
                      if (!isPlaceholderData && !data.lastPage) {
                        setPage(data.totalPages - 1);
                      }
                    }}
                    variant={"ghost"}
                  >
                    {data.totalPages}
                  </Button>
                </PaginationItem>
              </>
            ) : null}
            <PaginationItem>
              <PaginationNext
                variant={"ghost"}
                onClick={() => {
                  if (!isPlaceholderData && !data.lastPage) {
                    setPage((old) => old + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
