/* eslint-disable */
import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { TodoTable } from '../TodoTable';
import { getFilteredList } from '../../helpers/getFilteredList';
import { useAppSelector } from '../../app/hooks';

export const TodoTableContainer: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);

  const { status, query } = useAppSelector(state => state.filter);

  const visibleTodos: Todo[] = useMemo(
    () => getFilteredList(todos, status, query),
    [todos, status, query],
  );

  return (
    <>
      {!visibleTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
        <TodoTable>
          {visibleTodos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </TodoTable>
      )}
    </>
  );
};
