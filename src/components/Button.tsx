import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSortType } from '../store/actions';

export const Button = ({ sortType, title }: ButtonProps) => {
  const dispatch = useDispatch();
  const handleSort = useCallback(
    () => dispatch(setSortType(sortType)),
    [dispatch, sortType]
  );

  return (
    <button
      type="button"
      className="waves-effect waves-light btn mgb20"
      onClick={handleSort}
    >
      {title}
    </button>
  );
};
