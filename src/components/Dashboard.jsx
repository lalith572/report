import { useState } from "react";
import TableView from "./TableView";

const TABLES = ["user", "plant"];

export default function Dashboard() {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <div className="container mt-4">

      {/* CARDS */}
      <div className="row">
        {TABLES.map(table => (
          <div className="col-md-3 mb-3" key={table}>
            <div
              className={`card ${selectedTable === table ? "border-primary" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedTable(table)}
            >
              <div className="card-header text-capitalize">
                {table}
              </div>
              <div className="card-body text-center">
                <strong>Open</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE BELOW CARDS */}
      {selectedTable && <TableView table={selectedTable} />}

    </div>
  );
}
