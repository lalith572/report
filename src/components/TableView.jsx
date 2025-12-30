import { useEffect, useState } from "react";
import api from "../api/api";
import TableModal from "./TableModal";

export default function TableView({ table }) {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const loadData = () => {
    api.get(`/${table}`)
      .then(res => setRows(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, [table]);

  return (
    <div className="card mt-4">
      <div className="card-header d-flex justify-content-between">
        <strong className="text-capitalize">{table} Table</strong>
        <button
          className="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#tableModal"
          onClick={() => setSelectedRow(null)}
        >
          + Add
        </button>
      </div>

      <div className="card-body">
        {!rows.length ? (
          <p>No records found</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                {Object.keys(rows[0]).map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr
                  key={row.id}
                  data-bs-toggle="modal"
                  data-bs-target="#tableModal"
                  onClick={() => setSelectedRow(row)}
                  style={{ cursor: "pointer" }}
                >
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <TableModal table={table} data={selectedRow} onSaved={loadData} />
    </div>
  );
}
