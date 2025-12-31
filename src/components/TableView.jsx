import { useEffect, useState } from "react";
import api from "../api/api";
import TableModal from "./TableModal";

export default function TableView({ table }) {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const loadData = () => {
    api.get(`/${table}`)
      .then(res => {
        setRows(res.data);
        setPage(1); // reset page on table change
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, [table]);

  // 🔍 SEARCH
  const filteredRows = rows.filter(row =>
    JSON.stringify(row)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredRows.length / pageSize);
  const paginatedRows = filteredRows.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="card mt-4">
      <div className="card-header d-flex justify-content-between align-items-center">
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

        {/* 🔍 SEARCH BAR */}
       <form
          className="d-flex mb-3"
          onSubmit={e => {
            e.preventDefault();
            setPage(1);
          }}
        >
          <input
            className="form-control me-2"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
        
        {/* 📊 TABLE */}
        {!paginatedRows.length ? (
          <p>No records found</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                {Object.keys(paginatedRows[0]).map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map(row => (
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

        {/* 📄 PAGINATION */}
        {totalPages > 1 && (
          <nav>
            <ul className="pagination">
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* ➕ ADD / ✏️ EDIT MODAL */}
      <TableModal
        table={table}
        data={selectedRow}
        onSaved={loadData}
      />
    </div>
  );
}
