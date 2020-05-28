import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortType } from '../helpers/actions';

export const Button = ({ sortType, title }: ButtonProps) => {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className="waves-effect waves-light btn mgb20"
      onClick={() => dispatch(setSortType(sortType))}
    >
      {title}
    </button>
  );
};
