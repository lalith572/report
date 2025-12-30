export default function Pagination({ total, page, setPage }) {
  const pages = Math.ceil(total / 5);

  return (
    <nav>
      <ul className="pagination">
        {[...Array(pages)].map((_, i) => (
          <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
            <button className="page-link" onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
