import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BUTTONS } from './api/helpers';
import { setSortField, setSortOrder, setSortAsc } from './store/sort';
import * as selectors from './store/index';


const Buttons = () => {
  const dispatch = useDispatch();
  const sortTitle = useSelector(selectors.getSortField);
  const sortOrder = useSelector(selectors.getSortOrder);

  const handleSort = (sortField: string) => {
    if (sortTitle === sortField && sortOrder === 'ASC') {
      dispatch(setSortOrder());
    } else {
      dispatch(setSortAsc());
    }

    dispatch(setSortField(sortField));
  };

  return (
    <div className="buttons">
      {BUTTONS.map(button => (
        <button
          key={button.name}
          className="button"
          type="button"
          onClick={() => handleSort(button.name)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
