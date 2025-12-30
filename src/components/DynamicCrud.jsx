import { useEffect, useState } from "react";
import api from "../api";

export default function DynamicCrud() {
  const [table, setTable] = useState("user");
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  // 🔹 Load data whenever table changes
  useEffect(() => {
    const loadData = async () => {
      const res = await api.get(`/${table}`);
      setRows(res.data);
    };

    loadData();
  }, [table]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Create or Update
  const submit = async () => {
    if (editId) {
      await api.put(`/${table}/${editId}`, form);
    } else {
      await api.post(`/${table}`, form);
    }

    setForm({});
    setEditId(null);

    // reload data after save
    const res = await api.get(`/${table}`);
    setRows(res.data);
  };

  // 🔹 Edit row
  const edit = (row) => {
    setEditId(row.id);
    setForm(row);
  };

  // 🔹 Delete row
  const remove = async (id) => {
    await api.delete(`/${table}/${id}`);

    const res = await api.get(`/${table}`);
    setRows(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dynamic CRUD</h2>

      {/* Table Selector */}
      <select
        value={table}
        onChange={(e) => {
          setTable(e.target.value);
          setForm({});
          setEditId(null);
        }}
      >
        <option value="user">user</option>
        <option value="plant">plant</option>
      </select>

      {/* Form */}
      <div style={{ marginTop: 10 }}>
        {Object.keys(form)
          .filter((k) => k !== "id")
          .map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key}
              value={form[key] || ""}
              onChange={handleChange}
              style={{ marginRight: 5 }}
            />
          ))}

        <button onClick={submit}>
          {editId ? "Update" : "Create"}
        </button>
      </div>

      {/* Table */}
      <table border="1" style={{ marginTop: 20, width: "100%" }}>
        <thead>
          <tr>
            {rows[0] &&
              Object.keys(rows[0]).map((col) => (
                <th key={col}>{col}</th>
              ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {Object.keys(row).map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
              <td>
                <button onClick={() => edit(row)}>Edit</button>
                <button onClick={() => remove(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
