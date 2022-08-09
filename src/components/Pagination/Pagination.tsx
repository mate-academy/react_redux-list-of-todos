import React from 'react';
import './Pagination.css';
import { useDispatch, useSelector } from 'react-redux';
import { gettingPagination } from '../../store';
import { PaginationActionTypes } from '../../store/reducers/paginationReducer';

const Pagination: React.FC = () => {
  const { page, total, amountItemsPerPage } = useSelector(gettingPagination);
  const dispatch = useDispatch();

  function goToNextPage() {
    dispatch({ type: PaginationActionTypes.CHANGE_PAGE_NEXT });
  }

  function goToPreviousPage() {
    dispatch({ type: PaginationActionTypes.CHANGE_PAGE_PREV });
  }

  function changePage(event: React.MouseEvent<HTMLButtonElement>) {
    const pageNumber = Number(event.currentTarget.textContent);

    dispatch({
      type: PaginationActionTypes.CHANGE_PAGE,
      payload: pageNumber,
    });
  }

  const isRenderButton = (item: number) => {
    const indexPage = (total / amountItemsPerPage);

    return item > Math.floor(indexPage);
  };

  const isDisabled = () => {
    if (amountItemsPerPage !== 3) {
      Math.floor((total / amountItemsPerPage) + 1);
    }

    return Math.floor(total / amountItemsPerPage);
  };

  const getPaginationGroup = () => {
    return new Array(total).fill(0).map((_, idx) => {
      return idx + 1;
    });
  };

  return (
    <div className="pagination is-center">
      <select
        name="selectAmountPerPage"
        value={amountItemsPerPage}
        onChange={(event) => {
          dispatch({
            type: PaginationActionTypes.UPDATE_AMOUNT_ITEMS,
            payload: Number(event.currentTarget.value),
          });
        }}
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

      <button
        type="button"
        onClick={goToPreviousPage}
        disabled={page === 1}
        className="pagination-previous"
      >
        prev
      </button>

      <div className="pagination-list">
        {getPaginationGroup().map((item) => {
          if (isRenderButton(item)) {
            return null;
          }

          return (
            <button
              className={`pagination-link${item === page ? ' is-current' : ''}`}
              type="button"
              key={item}
              onClick={changePage}
            >
              <span>{item}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={goToNextPage}
        disabled={page >= isDisabled()}
        className="pagination-next"
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
