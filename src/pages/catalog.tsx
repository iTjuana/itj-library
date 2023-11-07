import { SimpleBook } from "~/components/book";
import { api } from "utils/trpc";
import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { type Inventary } from "@prisma/client";
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
    inventory?.map((book: Inventary) => book.bookId)
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
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">Catalog</h1>
        <div className="flex w-full justify-center gap-3">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex flex-col items-center gap-5">
          {inventoryBooks.isLoading || inventoryBooks.isFetching ? (
            <CircularProgress />
          ) : !inventoryBooks.data?.length ? (
            <p>No books right now :c</p>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-3 sm:w-5/6">
                {inventoryBooks.data?.map((book) => (
                  <SimpleBook book={book} key={book?.idISBN} />
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
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Catalog;
