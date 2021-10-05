import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
  userCount,
  displayCount,
  currentPage,
  onPageChanges,
}) => {
  const noOfPages = userCount === 0 ? 0 : Math.ceil(userCount / displayCount);

  const pages = _.range(1, noOfPages + 1);
  if (userCount <= displayCount) return null;

  return (
    <ul className="pagination pagination-md">
      {pages.map((page) => (
        <li
          key={page}
          className={currentPage === page ? "page-item active" : "page-item"}
        >
          <span className="page-link" onClick={() => onPageChanges(page)}>
            {page}
          </span>
        </li>
      ))}
    </ul>
  );
};

Pagination.propType = {
  userCount: PropTypes.number.isRequired,
  displayCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChanges: PropTypes.func.isRequired,
};

export default Pagination;
