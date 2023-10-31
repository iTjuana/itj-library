import { type BookResponse, SimpleBook } from "~/components/book";
import { api } from "utils/trpc";
import {
  CircularProgress,
  Input,
  MenuItem,
  Pagination,
  TextField,
} from "@mui/material";
import { type ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { type Book, type Inventary } from "@prisma/client";
import {
  Status,
  Format,
  Condition,
  Language,
  enumObjToFilterItem,
} from "utils/enum";

const isObjectEmpty = (object: object) => {
  return Object.keys(object).length === 0 && object.constructor === Object;
};

interface Filters {
  limit?: number;
  status?: number;
  format?: number;
  language?: number;
  page: number;
}

interface FilterItem {
  value: number;
  name: string;
}

interface FilterSelectProps {
  label: string;
  value: number | undefined;
  setValue: (arg0: number) => void;
  items?: FilterItem[];
  children?: ReactElement;
}

const FilterSelect = ({
  label,
  value,
  setValue,
  items,
  children,
}: FilterSelectProps) => {
  return (
    <>
      <TextField
        select
        label={label}
        className="w-40"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      >
        {items
          ? items?.map((item: FilterItem) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))
          : children}
      </TextField>
    </>
  );
};

const getBookFromExternalAPI = async (book: Book) => {
  const res = (await (
    await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${book.isbn}&jscmd=data&format=json`
    )
  ).json()) as BookResponse;

  if (isObjectEmpty(res) || (Array.isArray(res) && !res.length)) return null;

  const key: string = Object.keys(res)[0] || "";

  // Got lint fix from: https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
  return res[key as keyof typeof res];
};

const Catalog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = 5;

  // join all of these in an object
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [format, setFormat] = useState<number | undefined>(undefined);
  const [language, setLanguage] = useState<number | undefined>(undefined);
  const [filters, setFilters] = useState<Filters>({
    limit,
    status,
    format,
    language,
    page,
  });

  const count: number | undefined = api.inventory.count.useQuery().data;
  const inventory = api.inventory.getByFilter.useQuery(filters).data ?? [];
  const inventoryBooks = api.books.findBooksById.useQuery(
    inventory?.map((book: Inventary) => book.bookId)
  );

  useEffect(() => {
    if (searchParams.has("page"))
      setPage(parseInt(searchParams.get("page") as unknown as string));

    setFilters({
      limit,
      status,
      format,
      language,
      page,
    });

    console.log(
      `Debug Filters @ catalog\tpage = ${page}\n\tlimit = ${limit}\n\tfilter = ${JSON.stringify(
        filters
      )}`
    );
  }, [inventory, page]);

  const availabilityOptions: FilterItem[] = enumObjToFilterItem(Status);
  const FormatOptions: FilterItem[] = enumObjToFilterItem(Format);
  const LanguageOptions: FilterItem[] = enumObjToFilterItem(Language);

  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">Catalog</h1>
        <div className="flex w-full justify-center gap-3">
          <FilterSelect
            label="Availability"
            value={status}
            setValue={setStatus}
            items={availabilityOptions}
          />
          <FilterSelect
            label="Format"
            value={format}
            setValue={setFormat}
            items={FormatOptions}
          />
          <FilterSelect
            label="Language"
            value={language}
            setValue={setLanguage}
            items={LanguageOptions}
          />
          <Input placeholder="Search for a book..." />
        </div>
        <div className="flex flex-col items-center gap-5">
          {!inventoryBooks.isFetched ? (
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
                page={page}
                onChange={(e, val) => {
                  setPage(val);
                  // router.push(`?page=${val}`, undefined, { shallow: true });
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
