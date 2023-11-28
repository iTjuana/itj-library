import { useEffect, useState } from "react";

export type Row = {
  data: string[];
};

interface TableProps {
  id?: string;
  header: string[];
  rows: Row[];
}

export const Table: React.FunctionComponent<TableProps> = ({
  id,
  header,
  rows,
}) => {
  const [tableData, setTableData] = useState({
    header: [""],
    rows: [{ data: [""] }],
  });

  useEffect(() => setTableData({ header: header, rows: rows }), []);

  return (
    <>
      <table id={id} className="w-full font-normal text-[#556581]">
        <thead>
          <tr className="text-black">
            {tableData.header.map((title) => (
              <th key={title} className="font-normal">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, index) => (
            <tr key={index}>
              {row.data.map((data) => (
                <td key={data}>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
