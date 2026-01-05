import { useEffect, useState } from "react";
import TableView from "./TableView";
import api from "../api/api";

const TABLES = ["user", "plant"];

export default function Dashboard() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const loadCounts = async () => {
    setLoading(true);

    try {
      const responses = await Promise.all(
        TABLES.map(t => api.get(`/${t}`))
      );

      const result = {};
      TABLES.forEach((t, i) => {
        result[t] = responses[i].data.length;
      });

      setCounts(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  return (
    <div className="container mt-4">

      <div className="row">
        {TABLES.map(table => (
          <div className="col-md-3 mb-3" key={table}>
            <div
              className={`card ${
                selectedTable === table ? "border-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedTable(table)}
            >
              <div className="card-header text-capitalize">
                {table}
              </div>
              <div className="card-body text-center">
                {loading ? (
                  <div className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </div>
                ) : (
                  <strong>Total records: {counts[table] ?? 0}</strong>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTable && (
        <TableView
          table={selectedTable}
          refreshCounts={loadCounts} 
        />
      )}

    </div>
  );
}
