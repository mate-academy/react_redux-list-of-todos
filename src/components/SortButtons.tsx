import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SORT_BUTTONS } from '../helpers/constants';
import { setSortBy, setIsReversed, getIsReversed } from '../store';

export const SortButtons = () => {
  const dispatch = useDispatch();
  const isReversed = useSelector(getIsReversed);

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
      <button
        type="button"
        className="btn-floating btn-large cyan darken-4 ml1"
        onClick={() => dispatch(setIsReversed(!isReversed))}
      >
        <i className="material-icons">autorenew</i>
      </button>
    </>
  );
};
