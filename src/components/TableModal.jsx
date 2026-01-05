import { useEffect, useState } from "react";
import api from "../api/api";

export default function TableModal({ table, data, columns, onSaved }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!columns || columns.length === 0) {
      setForm({});
      return;
    }

    const baseForm = {};

    columns
      .filter(c => c !== "id")
      .forEach(c => {
        baseForm[c] = data?.[c] ?? "";
      });

    if (data?.id) baseForm.id = data.id;

    setForm(baseForm);
  }, [data, columns]);

  const submit = async () => {
    if (Object.keys(form).length === 0) {
      alert("Form is empty. Columns not loaded yet.");
      return;
    }

    try {
      setLoading(true);

      if (form.id) {
        await api.put(`/${table}/${form.id}`, form);
        alert("✅ Record updated successfully");
      } else {
        await api.post(`/${table}`, form);
        alert("✅ Record added successfully");
      }

      onSaved();

      const modalEl = document.getElementById("tableModal");
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.hide();

    } catch (err) {
      console.error(err);
      alert(
        "Failed to save data.\n\n" +
        (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id="tableModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title text-capitalize">
              {form.id ? "Edit" : "Add"} {table}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body">
            {Object.entries(form)
              .filter(([k]) => k !== "id")
              .map(([k, v]) => (
                <div className="form-floating mb-3" key={k}>
                  <input
                    className="form-control"
                    placeholder={k}
                    value={v}
                    onChange={e =>
                      setForm({ ...form, [k]: e.target.value })
                    }
                  />
                  <label className="text-capitalize">
                    {k.replaceAll("_", " ")}
                  </label>
                </div>
              ))}
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              disabled={loading}
            >
              Close
            </button>

            <button
              className="btn btn-primary"
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
