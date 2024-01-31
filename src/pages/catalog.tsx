import { SimpleBook } from "~/components/book";
import { api } from "utils/trpc";
import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { type Inventory } from "@prisma/client";
import { Filters } from "~/components/filters";

interface Filters {
  limit?: number;
  status?: number;
  format?: number;
  language?: number;
  search?: string;
  page: number;
}

const Catalog = () => {
  const searchParams = useSearchParams();
  const limit = 9;

  const [filters, setFilters] = useState<Filters>({
    status: undefined,
    format: undefined,
    language: undefined,
    search: undefined,
    limit,
    page: 1,
  });

  const inventory = api.inventory.getByFilter.useQuery(filters).data ?? [];
  const inventoryBooks = api.books.findBooksById.useQuery(
    inventory?.map((book: Inventory) => book.bookId)
  );
  const count: number | undefined = api.inventory.count.useQuery().data ?? 0;

  useEffect(() => {
    if (searchParams.has("page")) {
      setFilters({
        ...filters,
        page: parseInt(searchParams.get("page") ?? "1"),
      });
    }
  }, [searchParams, filters]);

  return (
    <>
      <main className="flex h-full w-full flex-col items-center gap-5 bg-[#F7F8FC] px-4 pb-2 pt-5">
        <h1 className="text-4xl font-medium">Catalog</h1>

        <Filters filters={filters} setFilters={setFilters} />

        {inventoryBooks.isLoading || inventoryBooks.isFetching ? (
          <div className="flex h-full w-full items-center justify-center justify-center">
            <CircularProgress />
          </div>
        ) : !inventoryBooks.data?.length ? (
          <p>No books right now :c</p>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <div className="flex w-full flex-wrap items-center justify-center gap-2">
              {inventoryBooks.data?.map((book) => (
                <div className="w-full px-4 lg:w-1/4 xl:w-1/5" key={book?.id}>
                  <SimpleBook book={book} />
                </div>
              ))}
            </div>
            <Pagination
              count={Math.ceil((count ?? limit) / limit)}
              size="large"
              page={filters.page}
              onChange={(e, val) => {
                setFilters({ ...filters, page: val });
              }}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Catalog;
