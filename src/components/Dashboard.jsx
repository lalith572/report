// import { useState } from "react";
// import TableView from "./TableView";

// const TABLES = ["user", "plant"];

// export default function Dashboard() {
//   const [selectedTable, setSelectedTable] = useState(null);

//   return (
//     <div className="container mt-4">

//       {/* CARDS */}
//       <div className="row">
//         {TABLES.map(table => (
//           <div className="col-md-3 mb-3" key={table}>
//             <div
//               className={`card ${selectedTable === table ? "border-primary" : ""}`}
//               style={{ cursor: "pointer" }}
//               onClick={() => setSelectedTable(table)}
//             >
//               <div className="card-header text-capitalize">
//                 {table}
//               </div>
//               <div className="card-body text-center">
//                 <strong>Open</strong>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* TABLE BELOW CARDS */}
//       {selectedTable && <TableView table={selectedTable} />}

//     </div>
//   );
// }
import { useEffect, useState } from "react";
import TableView from "./TableView";
import api from "../api/api";

const TABLES = ["user", "plant"];

export default function Dashboard() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    // Load count for each table
    TABLES.forEach(table => {
      api.get(`/${table}`)
        .then(res => {
          setCounts(prev => ({
            ...prev,
            [table]: res.data.length
          }));
        })
        .catch(err => {
          console.error(err);
          setCounts(prev => ({
            ...prev,
            [table]: 0
          }));
        });
    });
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
                <strong>Total records: {counts[table] ?? "…"}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedTable && <TableView table={selectedTable} />}

    </div>
  );
}
