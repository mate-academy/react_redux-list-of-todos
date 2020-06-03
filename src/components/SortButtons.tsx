import React from 'react';
import { useDispatch } from 'react-redux';
import { SORT_BUTTONS } from '../helpers/constants';
import { setSortBy } from '../store';

export const SortButtons = () => {
  const dispatch = useDispatch();

  return (
    <>
      {SORT_BUTTONS.map(({ id, name, title }) => (
        <button
          key={id}
          type="button"
          className="waves-effect waves-light btn-large"
          onClick={() => dispatch(setSortBy(name))}
        >
          {title}
        </button>
      ))}
    </>
  );
};
