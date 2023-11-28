import { Button } from "~/components/button";
import { DropdownMenu, type Option } from "~/components/dropdown";
import { Input } from "~/components/input";
import { Table, type Row } from "~/components/table";

type Stat = { name: string; value: number; color: string };

interface DashboardProps {
  stats: Stat[];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<any> = async () => {
  // here you should get the books from the database
  // dummy stats
  const stats = (await Promise.resolve([
    { name: "Active Users", value: 256, color: "#088484" },
    { name: "Total Books", value: 128, color: "#4DBCA1" },
    { name: "Available Books", value: 64, color: "#FFAE26" },
    { name: "Borrowed Books", value: 64, color: "#F45758" },
  ])) as Stat[];

  return { props: { stats } };
};

const Manage = ({ stats }: DashboardProps) => {
  const options = [
    { text: "ID", value: "ID" },
    { text: "Title", value: "Title" },
    { text: "Donor", value: "Donor" },
  ] as Option[];

  const headers = ["ID", "Title", "Status", "Format", "Language"];
  const rows = [
    { data: ["001", "book", "borrowed", "paperback", "english"] },
    { data: ["002", "book", "borrowed", "paperback", "english"] },
    { data: ["003", "book", "borrowed", "paperback", "english"] },
    { data: ["004", "book", "borrowed", "paperback", "english"] },
    { data: ["005", "book", "borrowed", "paperback", "english"] },
    { data: ["006", "book", "borrowed", "paperback", "english"] },
  ] as Row[];

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
              <p>Search by:</p>
              <DropdownMenu options={options} placeholder="ID, Title..." />
              <Input
                id="filter-id"
                name="filter"
                placeholder="Title, Author or Keyword..."
              />
              <Button onClick={() => console.log("edit")}>Edit</Button>
              <Button onClick={() => console.log("delete")}>Delete</Button>
              <Dialog textButton='Add'></Dialog>
            </div>
            {/* Data Table */}
            <Table header={headers} rows={rows} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Manage;
