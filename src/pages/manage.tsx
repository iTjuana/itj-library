import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

type Stat = { name: string; value: number; color: string };

interface DashboardProps {
  stats: Stat[];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<any> = async () => {
  // here you should get the books from the database
  // dummy stats
  const stats = await Promise.resolve([
    { name: "Active Users", value: 256, color: "#088484" },
    { name: "Total Books", value: 128, color: "#4DBCA1" },
    { name: "Available Books", value: 64, color: "#FFAE26" },
    { name: "Borrowed Books", value: 64, color: "#F45758" },
  ]);

  return { props: { stats } };
};

const Manage = ({ stats }: DashboardProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 170 },
    { field: "status", headerName: "Status", width: 90 },
    { field: "format", headerName: "Format", width: 90 },
    { field: "language", headerName: "Language", width: 90 },
  ];

  const rows = [
    {
      id: "001",
      title: "book",
      status: "borrowed",
      format: "paperback",
      language: "english",
    },
    {
      id: "002",
      title: "book",
      status: "borrowed",
      format: "paperback",
      language: "english",
    },
    {
      id: "003",
      title: "book",
      status: "borrowed",
      format: "paperback",
      language: "english",
    },
    {
      id: "004",
      title: "book",
      status: "borrowed",
      format: "paperback",
      language: "english",
    },
    {
      id: "005",
      title: "book",
      status: "borrowed",
      format: "paperback",
      language: "english",
    },
    {
      id: "006",
      title: "book",
      status: "borrowed",
      format: "paperback",
      language: "english",
    },
  ];

  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">Dashboard</h1>
        {/* Stats */}
        <section className="flex max-w-3xl items-center gap-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className={`flex h-20 w-20 flex-col items-center rounded-[5px] border-b-[3px] border-[${stat.color}] bg-white py-2`}
            >
              <h3 className="text-base font-bold text-[#323232]">
                {stat.value}
              </h3>
              <h3 className="text-center font-light text-[#737373]">
                {stat.name}
              </h3>
            </div>
          ))}
        </section>
        {/* Inventory */}
        <section className="flex max-w-7xl flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3 rounded bg-white p-4">
            <h3 className="text-2xl font-medium text-[#323232]">Inventory</h3>
            <div className="flex gap-2.5 px-8">
              <Button onClick={() => console.log("edit")}>Edit</Button>
              <Button onClick={() => console.log("delete")}>
                Delete
              </Button>
            </div>
            {/* Data Table */}
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Manage;
