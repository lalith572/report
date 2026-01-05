// import { useEffect, useState } from "react";
// import DataTable from "datatables.net-react";
// import DT from "datatables.net-bs5";
// import api from "../api/api";
// import TableModal from "./TableModal";

// DataTable.use(DT);

// export default function TableView({ table, refreshCounts }) {
//   const [rows, setRows] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [editRow, setEditRow] = useState(null);

//   const loadTable = async () => {
//     if (!table) return;

//     setRows([]);
//     setColumns([]);

//     const res = await api.get(`/${table}`);
//     const data = Array.isArray(res.data) ? res.data : [];

//     setRows(data);

//     if (data.length > 0) {
//       setColumns(
//         Object.keys(data[0]).map(key => ({
//           title: key,
//           data: key,
//         }))
//       );
//     }
//   };

//   useEffect(() => {
//     loadTable();
//   }, [table]);

//   const tableKey =
//     table + "-" + columns.map(c => c.data).join("-");

//   return (
//     <div className="card mt-4">
//       {/* HEADER */}
//       <div className="card-header d-flex justify-content-between align-items-center">
//         <strong className="text-capitalize">{table} Table</strong>

//         <button
//           className="btn btn-sm btn-success"
//           data-bs-toggle="modal"
//           data-bs-target="#tableModal"
//           onClick={() => setEditRow(null)}
//         >
//           Add
//         </button>
//       </div>

//       {/* BODY */}
//       <div className="card-body">
//         {columns.length > 0 ? (
//           <DataTable
//             key={tableKey}
//             data={rows}
//             columns={columns}
//             className="table table-bordered table-striped"
//             options={{
//               pageLength: 10,
//               searching: true,
//               ordering: true,
//               language: {
//                 emptyTable: "No data available in table",
//               },

//               rowCallback: (row, rowData) => {
//                 row.style.cursor = "pointer";
//                 row.onclick = () => setEditRow(rowData);
//               },
//             }}
//           />
//         ) : (
//           <div className="text-muted">No data available</div>
//         )}
//       </div>

//       {/* MODAL */}
//       <TableModal
//         table={table}
//         data={editRow}
//         columns={columns.map(c => c.data)}
//         onSaved={() => {
//           loadTable();
//           refreshCounts?.();
//           setEditRow(null);
//         }}
//       />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import api from "../api/api";
import TableModal from "./TableModal";

DataTable.use(DT);

export default function TableView({ table, refreshCounts }) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editRow, setEditRow] = useState(null);

  const loadTable = async () => {
    if (!table) return;

    const res = await api.get(`/${table}`);
    const data = Array.isArray(res.data) ? res.data : [];

    setRows(data);

    if (data.length > 0) {
      setColumns(
        Object.keys(data[0]).map(key => ({
          title: key,
          data: key,
        }))
      );
    } else {
      setColumns([]);
    }
  };

  useEffect(() => {
    loadTable();
  }, [table]);

  const tableKey =
    table + "-" + columns.map(c => c.data).join("-");

  return (
    <div className="card mt-4">
      {/* HEADER */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong className="text-capitalize">{table} Table</strong>

        {/* ADD */}
        <button
          className="btn btn-sm btn-success"
          onClick={() => {
            setEditRow({});
            document.getElementById("openModalBtn").click();
          }}
        >
          Add
        </button>
      </div>

      {/* BODY */}
      <div className="card-body">
        {columns.length > 0 ? (
          <DataTable
            key={tableKey}
            data={rows}
            columns={columns}
            className="table table-bordered table-striped"
            options={{
              pageLength: 10,
              searching: true,
              ordering: true,
              language: {
                emptyTable: "No data available in table",
              },
              rowCallback: (row, rowData) => {
                row.style.cursor = "pointer";
                row.onclick = () => {
                  setEditRow(rowData);
                  document.getElementById("openModalBtn").click();
                };
              },
            }}
          />
        ) : (
          <div className="text-muted">No data available</div>
        )}
      </div>

      {/* 🔹 HIDDEN MODAL TRIGGER (Bootstrap controls modal) */}
      <button
        id="openModalBtn"
        data-bs-toggle="modal"
        data-bs-target="#tableModal"
        style={{ display: "none" }}
      />

      {/* MODAL */}
      <TableModal
        table={table}
        data={editRow}
        columns={columns.map(c => c.data)}
        onSaved={() => {
          loadTable();
          refreshCounts?.();
          setEditRow(null);
        }}
      />
    </div>
  );
}
