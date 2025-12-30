import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TableView from "./components/TableView";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Dashboard />
            </>
          </ProtectedRoute>
        } />

        <Route path="/table/:table" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <TableView />
            </>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}
