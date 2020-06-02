import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BUTTONS } from './api/helpers';
import { setSortField, setSortOrder, setSortAsk } from './store/sort';
import * as selectors from './store/index';


const Buttons = () => {
  const dispatch = useDispatch();
  const sortTitle = useSelector(selectors.field);

  const handleSort = (sortField: string) => {
    dispatch(setSortField(sortField));
    if (sortTitle === sortField) {
      dispatch(setSortOrder());
    } else {
      dispatch(setSortAsk());
    }
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
