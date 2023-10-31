import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { api } from "utils/trpc";
import { Status, Format, Condition, Language, getEnumKey } from "utils/enum";

type Stat = { name: string; value: number; color: string };

const Manage = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 225 },
    { field: "title", headerName: "Title", width: 275 },
    { field: "status", headerName: "Status", width: 90 },
    { field: "format", headerName: "Format", width: 90 },
    { field: "language", headerName: "Language", width: 90 },
  ];

  const userCount = api.users.getUserCount.useQuery();
  const inventory = api.inventory.getFullInventory.useQuery();

  const stats = [
    { name: "Active Users", value: userCount.data, color: "#088484" },
    { name: "Total Books", value: inventory.data?.length, color: "#4DBCA1" },
    {
      name: "Available Books",
      value: inventory.data?.filter((book) => book.status === 0).length,
      color: "#FFAE26",
    },
    {
      name: "Borrowed Books",
      value: inventory.data?.filter((book) => book.status === 2).length,
      color: "#F45758",
    },
  ];

  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">Dashboard</h1>
        {/* Stats */}
        <section className="flex max-w-3xl items-center gap-4">
          {stats.map((stat) => {
            return (
              <div
                key={stat.name}
                className={
                  "flex h-20 w-20 flex-col items-center rounded-[5px] border-b-[3px] bg-white py-2"
                }
                style={{ borderColor: stat.color }}
              >
                <h3 className="text-base font-bold text-[#323232]">
                  {stat.value}
                </h3>
                <h3 className="text-center font-light text-[#737373]">
                  {stat.name}
                </h3>
              </div>
            );
          })}
        </section>
        {/* Inventory */}
        <section className="flex max-w-7xl flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3 rounded bg-white p-4">
            <h3 className="text-2xl font-medium text-[#323232]">Inventory</h3>
            <div className="flex gap-2.5 px-8">
              <Button onClick={() => console.log("edit")}>Edit</Button>
              <Button onClick={() => console.log("delete")}>Delete</Button>
            </div>
            {/* Data Table */}
            {inventory.isLoading ? (
              <CircularProgress />
            ) : !inventory.data?.length ? (
              <p>No books right now :c</p>
            ) : (
              <DataGrid
                rows={inventory.data.map((book) => ({
                  id: book.id,
                  status: getEnumKey(Status, book.status),
                  format: getEnumKey(Format, book.format),
                  language: getEnumKey(Language, book.book.language),
                  title: book.book.title,
                }))}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Manage;
