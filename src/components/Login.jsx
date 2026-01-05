// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../auth/auth";

// export default function Login() {
//   const [icno, setIcno] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("admin");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const submit = (e) => {
//     e.preventDefault();

//     const success = login(icno, password, role);

//     if (!success) {
//       setError("Invalid credentials");
//     } else {
//       navigate("/home");
//     }
//   };

//   return (
//     <div className="container col-md-4 mt-5">
//       <h3 className="text-center">Login</h3>

//       {error && <div className="alert alert-danger">{error}</div>}

//       <form onSubmit={submit}>
//         <input
//           className="form-control mb-2"
//           placeholder="IC No"
//           onChange={e => setIcno(e.target.value)}
//         />

//         <input
//           type="password"
//           className="form-control mb-2"
//           placeholder="Password"
//           onChange={e => setPassword(e.target.value)}
//         />

//         <div className="mb-3">
//           <label className="me-3">
//             <input type="radio" checked={role === "admin"} onChange={() => setRole("admin")} />
//             Admin
//           </label>
//           <label>
//             <input type="radio" checked={role === "user"} onChange={() => setRole("user")} />
//             User
//           </label>
//         </div>

//         <button className="btn btn-primary w-100">Login</button>
//       </form>

//       <small className="text-muted">
//         admin/admin or user/user
//       </small>
//     </div>
//   );
// }
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { login } from "../auth/auth";

// // export default function Login() {
// //   const [icno, setIcno] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const navigate = useNavigate();

// //   const submit = (e) => {
// //     e.preventDefault();

// //     const result = login(icno, password);

// //     if (!result) {
// //       setError("Invalid credentials");
// //     } else {
// //       // ✅ Navigate based on role
// //       if (result.role === "admin") {
// //         navigate("/admin");
// //       } else {
// //         navigate("/user");
// //       }
// //     }
// //   };

// //   return (
// //     <div className="container col-md-4 mt-5">
// //       <h3 className="text-center">Login</h3>

// //       {error && <div className="alert alert-danger">{error}</div>}

// //       <form onSubmit={submit}>
// //         <input
// //           className="form-control mb-2"
// //           placeholder="IC No"
// //           value={icno}
// //           onChange={e => setIcno(e.target.value)}
// //         />

// //         <input
// //           type="password"
// //           className="form-control mb-3"
// //           placeholder="Password"
// //           value={password}
// //           onChange={e => setPassword(e.target.value)}
// //         />

// //         <button className="btn btn-primary w-100">Login</button>
// //       </form>

// //       <small className="text-muted">
// //         admin/admin or user/user
// //       </small>
// //     </div>
// //   );
// // }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const [icno, setIcno] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/login", {
        icno,
        password
      });

      const { role } = res.data;

      // redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

    } catch (err) {
      setError("Invalid IC No or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container col-md-4 mt-5">
      <h3 className="text-center mb-3">Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={submit}>
        <input
          className="form-control mb-3"
          placeholder="IC No"
          value={icno}
          onChange={e => setIcno(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// router.post("/login", async (req, res) => {
//   const { icno, password } = req.body;

//   if (!icno || !password) {
//     return res.status(400).json({ message: "Missing credentials" });
//   }

//   try {
//     const [rows] = await db.query(
//       "SELECT id, role FROM user WHERE ic_no=? AND password=?",
//       [icno, password]
//     );

//     if (rows.length === 0) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({
//       success: true,
//       role: rows[0].role
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
