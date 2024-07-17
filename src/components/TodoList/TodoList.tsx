/* eslint-disable */
import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getFilteredByQuery, getPreparedTodos } from '../../utils';
import { ErrorNotification } from '../ErrorNotification';
import { TodoItem } from '../TodoItem';
import { TodoTitle } from '../TodoTitle';

type Props = {
  onOpenModal: () => void;
  getUserById: (userId: number) => Promise<User>;
  errorFetch: string;
  loading: boolean;
};

export const TodoList: React.FC<Props> = ({
  onOpenModal,
  getUserById,
  errorFetch,
  loading,
}) => {
  const todos = useAppSelector(state => state.todos.items);
  const filterStatus = useAppSelector(state => state.filter.status);
  const filterQuery = useAppSelector(state => state.filter.query);

  const preparedTodos = getPreparedTodos(todos, filterStatus);
  const filteredTodos = getFilteredByQuery(preparedTodos, filterQuery);

  if (errorFetch) {
    return <h1>Error fetch</h1>;
  }

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        {filteredTodos.length !== 0 && <TodoTitle />}

        <tbody>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              getUserById={getUserById}
              onOpenModal={onOpenModal}
            />
          ))}

          {!filteredTodos.length && !loading && <ErrorNotification />}
        </tbody>
      </table>
    </>
  );
};
