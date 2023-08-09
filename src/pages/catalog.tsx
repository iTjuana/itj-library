import { type BookResponse, SimpleBook, type Book } from "~/components/book";
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

// recommended to use instead of enums
// by https://www.youtube.com/watch?v=jjMbPt_H3RQ
const AVAILABILITY = {
  Any: 0,
  Available: 1,
  Unavailable: 2,
} as const;

type ObjectValues<T> = T[keyof T];

const enum Format {
  Any,
  Hardcover,
  Paperback,
}

const enum Language {
  Any,
  English,
  Spanish,
}

const isObjectEmpty = (object: object) => {
  return Object.keys(object).length === 0 && object.constructor === Object;
};

interface BookDB {
  id: string;
  isbn: string;
  status: string;
  format: string;
  condition: string;
  bookOwner: string;
  dateAdded: Date;
  lastUpdate: Date;
  transaction: unknown;
}

interface Filters {
  limit?: number;
  availability?: number;
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

const Catalog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = 5;

  const [page, setPage] = useState<number>(1);
  const [availability, setAvailability] = useState<number | undefined>(
    undefined
  );
  const [format, setFormat] = useState<number | undefined>(undefined);
  const [language, setLanguage] = useState<number | undefined>(undefined);
  const [books, setBooks] = useState<(Book | null)[] | null>(null);
  const [filters, setFilters] = useState<Filters>({
    limit,
    page,
  });
  const count: number | undefined = api.inventory.count.useQuery().data;
  const inventory = api.inventory.inventory.useQuery(filters).data;

  useEffect(() => {
    const fetchBooks = async (books: BookDB[]) => {
      const values: ({ book: Book } | null)[] = await Promise.all(
        books.map(async (book: BookDB) => {
          const res = (await (
            await fetch(
              `https://openlibrary.org/api/books?bibkeys=ISBN:${book.isbn}&jscmd=data&format=json`
            )
          ).json()) as BookResponse;

          if (isObjectEmpty(res) || (Array.isArray(res) && !res.length))
            return null;

          const key: string = Object.keys(res)[0] || "";

          // Got lint fix from: https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
          return res[key as keyof typeof res];
        })
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setBooks(values);
    };

    if (searchParams.has("page"))
      setPage(parseInt(searchParams.get("page") as unknown as string));

    setFilters({
      limit,
      availability,
      format,
      language,
      page,
    });
    console.log("useEffect...");
    console.log(
      `\tpage = ${page}\n\tlimit = ${limit}\n\tfilter = ${JSON.stringify(
        filters
      )}`
    );

    if (inventory && !books)
      fetchBooks(inventory as unknown as BookDB[]).catch(() =>
        console.log("error when fetching books")
      );
  }, [inventory, page]);

  const availabilityOptions: FilterItem[] = [
    { value: AVAILABILITY.Any, name: "All" },
    { value: AVAILABILITY.Available, name: "Available" },
    { value: AVAILABILITY.Unavailable, name: "Unavailable" },
  ];
  const FormatOptions: FilterItem[] = [
    { value: Format.Any, name: "All" },
    { value: Format.Hardcover, name: "Hard-cover" },
    { value: Format.Paperback, name: "Paperback" },
  ];
  const LanguageOptions: FilterItem[] = [
    { value: Language.Any, name: "All" },
    { value: Language.English, name: "English" },
    { value: Language.Spanish, name: "Spanish" },
  ];

  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">Catalog</h1>
        <div className="flex w-full justify-center gap-3">
          <FilterSelect
            label="Availability"
            value={availability}
            setValue={setAvailability}
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
          {!books ? (
            <CircularProgress />
          ) : !books.length ? (
            <p>No books right now :c</p>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-3 sm:w-5/6">
                {books?.map((book) => (
                  <SimpleBook book={book} key={book?.key} />
                ))}
              </div>
              <Pagination
                count={Math.ceil((count ?? limit) / limit)}
                size="large"
                page={page}
                onChange={(e, val) => {
                  console.log("val", val);
                  setPage(val);
                  setBooks(null);
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
