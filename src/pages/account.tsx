import { Button } from "~/components/button";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

type User = { name: string; company: string; email: string; phone: string };
type BookActivity = {
  id: string;
  title: string;
  dueDate: string;
  status: string;
};
interface UserActivity {
  activity: BookActivity[];
}

type Row = {
  data: string[];
};

interface TableProps {
  id?: string;
  header: string[];
  rows: Row[];
}

const Table: React.FunctionComponent<TableProps> = ({ id, header, rows }) => {
  return (
    <>
      <table id={id} className="w-full font-normal text-[#556581]">
        <thead>
          <tr className="text-black">
            {header.map((title) => (
              <th key={title} className="font-normal">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.data.map((data, index) =>
                index !== 4 ? (
                  <td key={data}>{data}</td>
                ) : (
                  <td key={data}>
                    <Button
                      onClick={() =>
                        console.log(
                          "This should open a modal to change user info"
                        )
                      }
                      isSecondary={data === "See Book"}
                    >
                      {data}
                    </Button>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const SessionComponent = () => {
  const { data: session, status } = useSession();

  const headers = ["ID", "Title", "Due Date", "Status", "Action"];
  const rows = [
    { data: ["001", "book", "7 June 2023", "Borrowed", "Return"] },
    { data: ["002", "book", "7 June 2023", "Returned", "See Book"] },
    { data: ["003", "book", "7 June 2023", "Borrowed", "Return"] },
    { data: ["004", "book", "7 June 2023", "Borrowed", "Return"] },
    { data: ["005", "book", "7 June 2023", "Borrowed", "Return"] },
    { data: ["006", "book", "7 June 2023", "Borrowed", "Return"] },
  ] as Row[];

  if (session) {
    return (
      <>
        <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] sm:w-1/3">
          <h3 className="text-xl font-semibold">General Information</h3>
          <section className="flex flex-col gap-2">
            <div className="flex gap-2.5">
              <p className="font-medium">Full name:</p>
              <p className="font-light">{session?.user.name}</p>
            </div>
            {session?.user.email && (
              <div className="flex gap-2.5">
                <p className="font-medium">Company:</p>
                <p className="font-light">{session.user.email.split("@")[1]}</p>
              </div>
            )}
          </section>
          <hr />
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <section className="flex flex-col gap-1">
            <div className="flex gap-2.5">
              <p className="font-medium">Email:</p>
              <p className="font-light">{session?.user.email}</p>
            </div>
            {/* {session?.user.number && ( // TODO: there is no phone number in the session
              <div className="flex gap-2.5">
                <p className="font-medium">Phone number:</p>
                <p className="font-light">{session.user.number}</p>
              </div>
            )} */}
          </section>
          <Button
            icon={faPenToSquare}
            onClick={() =>
              console.log("This should open a modal to change user info")
            }
          >
            Edit general information
          </Button>
        </div>
        <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] sm:w-1/3">
          <h3 className="text-xl font-semibold">Activity</h3>
          <Table header={headers} rows={rows}></Table>
        </div>
        <Activity transactions={transactions} />
      </>
    );
  }
  return (
    <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] sm:w-1/3">
      Not signed in <br />
      <button onClick={() => void signIn()}>Log in</button>
    </div>
  );
};

const Account = () => {
  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">My Account</h1>
        <SessionComponent />
      </main>
    </>
  );
};

export default Account;
