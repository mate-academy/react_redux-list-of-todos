import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, setTodos } from '../store';

const buttons = [
  { name: 'Sort by Name', sortType: 'title' },
  { name: 'Sort by Completed', sortType: 'completed' },
  { name: 'Sort by User Name', sortType: 'user' },
];


const activeBtn = 'title';

export const SortPanel = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const sortChange = (sortType: string) => {
    switch (sortType) {
      case 'title':
        dispatch(
          setTodos(
            [...todos].sort((a, b) => {
              return a.title.localeCompare(b.title);
            }),
          ),
        );

        return;
      case 'completed':
        dispatch(
          setTodos(
            [...todos].sort((a, b) => {
              return +a.completed - +b.completed;
            }),
          ),
        );

        return;
      case 'user':
        dispatch(
          setTodos(
            [...todos].sort((a, b) => {
              return a.user.name.localeCompare(b.user.name);
            }),
          ),
        );

        return;
      default:
        dispatch(setTodos(todos));
    }
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
