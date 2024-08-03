export const Pagination = ({ currentPage, paginationControls, handleSetCurrentPage, countPages, pages }) => {
  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage == 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => paginationControls(-1)}>
            Anterior
          </button>
        </li>
        {countPages.map((item, i) => (
          <li className="page-item" key={i}>
            <button className={`page-link ${currentPage == item ? "active" : ""}`} onClick={() => handleSetCurrentPage(item)}>
              {item}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage == pages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => paginationControls(1)}>
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};
