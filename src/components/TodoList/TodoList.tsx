import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TodoItem } from './TodoItem';
import { Button } from '../Button';
import { HEADERS, SortFields } from '../../helpers';

import {
  getTodos,
  setSortField,
  getSortType,
  setSortReverse,
  isReverse,
} from '../../store';

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const sortField = useSelector(getSortType);
  const reverse = useSelector(isReverse);

  const handleSort = (field: SortFields) => {
    if (field === sortField) {
      dispatch(setSortReverse(true));
    } else {
      dispatch(setSortField(field));
      dispatch(setSortReverse(false));
    }
  };

  const getSortField = (a: Todo, b: Todo) => {
    const sortDirection = (reverse) ? -1 : 1;

    switch (sortField) {
      case SortFields.Id:
        return (a.id - b.id) * sortDirection;

      case SortFields.Name:
        return (a.user.username).localeCompare(b.user.username) * sortDirection;

      case SortFields.Title:
        return (a.title).localeCompare(b.title) * sortDirection;

      case SortFields.Completed:
        return (Number(a.completed) - Number(b.completed)) * -sortDirection;

      default:
        return 0;
    }
  };

  const sortedTodos = useMemo(() => [...todos].sort(getSortField), [todos, sortField, reverse]);

  return (
    <table className="table">
      <thead>
        <tr>
          {HEADERS.map((header) => (
            <th key={header.name} className="bd-callout is-primary table__header">
              <Button
                text={header.name}
                className="button is-primary is-inverted is-outlined is-medium is-fullwidth"
                handleClick={() => handleSort(header.field)}
              />
            </th>
          ))}
          <th className="bd-callout is-primary table__header">
            <div className="table__header-content">Delete</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedTodos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
};
