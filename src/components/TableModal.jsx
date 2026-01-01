import { useEffect, useState } from "react";
import api from "../api/api";

export default function TableModal({ table, data, columns, onSaved }) {
  const [form, setForm] = useState({});

  // Initialize form dynamically
  useEffect(() => {
    if (data) {
      // EDIT MODE
      setForm(data);
    } else {
      // ADD MODE
      const emptyForm = {};
      columns
        ?.filter(col => col !== "id")
        .forEach(col => {
          emptyForm[col] = "";
        });
      setForm(emptyForm);
    }
  }, [data, columns]);

  // ✅ Reset form on modal close
  useEffect(() => {
    const modalEl = document.getElementById("tableModal");

    const resetForm = () => setForm({});

    modalEl.addEventListener("hidden.bs.modal", resetForm);

    return () => {
      modalEl.removeEventListener("hidden.bs.modal", resetForm);
    };
  }, []);

  const submit = async () => {
    if (form.id) {
      await api.put(`/${table}/${form.id}`, form);
    } else {
      await api.post(`/${table}`, form);
    }

    onSaved();

    // ✅ Auto-close modal
    const modalEl = document.getElementById("tableModal");
    const modal = window.bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };

  return (
    <div className="modal fade" id="tableModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content p-3">
          <h5 className="mb-3 text-capitalize">
            {form.id ? "Edit" : "Add"} {table}
          </h5>

          {Object.keys(form)
            .filter(k => k !== "id")
            .map(k => (
              <div key={k} className="mb-2">
                <label className="form-label text-capitalize">
                  {k}
                </label>
                <input
                  className="form-control"
                  value={form[k] ?? ""}
                  onChange={e =>
                    setForm({ ...form, [k]: e.target.value })
                  }
                />
              </div>
            ))}

          <div className="text-end mt-3">
            <button className="btn btn-primary" onClick={submit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
