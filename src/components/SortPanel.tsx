import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortField } from '../store';

const buttons = [
  { name: 'Sort by Name', sortType: 'title' },
  { name: 'Sort by Completed', sortType: 'completed' },
  { name: 'Sort by User Name', sortType: 'user' },
];


const activeBtn = 'title';

export const SortPanel = () => {
  const dispatch = useDispatch();
  const sortChange = (sortType: string) => {
    dispatch(setSortField(sortType));
  };

  return (
    <p>
      {buttons.map(({ name, sortType }) => {
        return (
          <button
            type="button"
            key={name}
            onClick={() => sortChange(sortType)}
            className={sortType === activeBtn ? 'btn btn-warning active' : 'btn btn-warning'}
          >
            {name}
          </button>
        );
      })}
    </p>
  );
};
