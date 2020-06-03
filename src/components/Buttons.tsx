import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReverseStatus,
  getSortType,
  reverseTodos,
  setSortType,
} from '../store';

export const controlButtonConfig = [
  {
    name: 'Sort by name',
    sortType: 'userName',
  },
  {
    name: 'Sort by title',
    sortType: 'title',
  },
  {
    name: 'Sort by status',
    sortType: 'completed',
  },
];

export const Button = () => {
  const dispatch = useDispatch();
  const sortType = useSelector(getSortType);
  const isReverse = useSelector(getReverseStatus);

  const changeSortType = (type: string) => {
    if (!type) {
      return;
    }

    if (type === sortType) {
      dispatch(reverseTodos(!isReverse));
    } else {
      dispatch(reverseTodos(false));
      dispatch(setSortType(type));
    }
  };

  return (
    <ul className="button__list">
      {controlButtonConfig.map(button => (
        <li className="item" key={button.name}>
          <button
            type="button"
            className="button waves-effect waves-light btn mgb20"
            onClick={() => changeSortType(button.sortType)}
          >
            {button.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
