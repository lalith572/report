// import { useEffect, useState } from "react";
// import DataTable from "datatables.net-react";
// import DT from "datatables.net-dt";
// import api from "../api/api";
// import TableModal from "./TableModal";

// DataTable.use(DT);

// export default function TableView({ table }) {
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);

//   useEffect(() => {
//     if (!table) return;

//     api.get(`/${table}`)
//       .then(res => {
//         const rows = res.data;

//         if (!Array.isArray(rows)) {
//           console.error("API response is not an array");
//           return;
//         }

//         if (rows.length > 0) {
//           const cols = Object.keys(rows[0]).map(key => ({
//             title: key,
//             data: key,
//           }));
//           setColumns(cols);
//         } else {
//           setColumns([]);
//         }

//         setData(rows);
//       })
//       .catch(err => console.error(err));
//   }, [table]);

//   return (
//     <div className="card mt-4">
//       <div className="card-header">
//         <strong className="text-capitalize">{table} Table</strong>
//       </div>

//       <div className="card-body">
//         {data.length === 0 ? (
//           <p>No records found</p>
//         ) : (
//           <DataTable
//             key={table}
//             data={data}
//             columns={columns}
//             className="display"
//             options={{
//               pageLength: 10,
//               searching: true,
//               ordering: true,
//               destroy: true,
//               columnDefs: [
//                 { className: "text-center", targets: "_all" }
//               ]
//             }}
//           />

//         )}
//       </div>

//       <TableModal
//         table={table}
//         data={data}
//         onSaved={() =>
//           api.get(`/${table}`).then(res => setData(res.data))
//         }
//         columns={columns.map(c => c.data)}   
//       />
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import api from "../api/api";
import TableModal from "./TableModal";

DataTable.use(DT);

export default function TableView({ table }) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (!table) return;

    api.get(`/${table}`).then(res => {
      const rows = res.data;

      if (rows.length > 0) {
        setColumns(
          Object.keys(rows[0]).map(key => ({
            title: key,
            data: key,
          }))
        );
      } else {
        setColumns([]);
      }

      setData(rows);
    });
  }, [table]);

  return (
    <div className="card mt-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong className="text-capitalize">{table} Table</strong>

        <button
          className="btn btn-success btn-sm"
          onClick={() => setSelectedRow(null)}
          data-bs-toggle="modal"
          data-bs-target="#tableModal"
        >
          + Add
        </button>
      </div>

      <div className="card-body">
        <DataTable
          key={table}
          data={data}
          columns={columns}
          className="display"
          options={{
            pageLength: 10,
            searching: true,
            ordering: true,
            destroy: true,
            columnDefs: [{ className: "text-center", targets: "_all" }]
          }}
          onRowClick={(row) => {
            setSelectedRow(row);
            document.getElementById("openModalBtn").click();
          }}
        />
      </div>

      <button
        id="openModalBtn"
        data-bs-toggle="modal"
        data-bs-target="#tableModal"
        style={{ display: "none" }}
      />

      <TableModal
        table={table}
        data={selectedRow}
        columns={columns.map(c => c.data)}
        onSaved={() =>
          api.get(`/${table}`).then(res => setData(res.data))
        }
      />
    </div>
  );
}
