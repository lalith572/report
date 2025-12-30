import { useEffect, useState } from "react";
import api from "../api/api";

export default function TableModal({ table, data, onSaved }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(data || {});
  }, [data]);

  const submit = async () => {
    if (form.id) {
      await api.put(`/${table}/${form.id}`, form);
    } else {
      await api.post(`/${table}`, form);
    }
    onSaved();
  };

  return (
    <div className="modal fade" id="tableModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <h5 className="mb-3">
            {form.id ? "Edit" : "Add"} {table}
          </h5>

          {Object.keys(form)
            .filter(k => k !== "id")
            .map(k => (
              <input
                key={k}
                className="form-control mb-2"
                placeholder={k}
                value={form[k] || ""}
                onChange={e =>
                  setForm({ ...form, [k]: e.target.value })
                }
              />
            ))}

          <div className="text-end">
            <button className="btn btn-primary" onClick={submit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
