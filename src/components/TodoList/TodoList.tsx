/* eslint-disable */
import React from 'react';

import { Loader } from '..';
import { useAppSelector } from '../../app/hooks';
import { getFilteredByQuery, getPreparedTodos } from '../../utils';
import { ErrorNotification } from '../ErrorNotification';
import { TodoItem } from '../TodoItem';
import { TodoTitle } from '../TodoTitle';
import { Status } from '../../types/Status';

type Props = {
  onOpenModal: () => void;
  showModal: boolean;
};

export const TodoList: React.FC<Props> = ({ onOpenModal, showModal }) => {
  const { loading, items, error } = useAppSelector(state => state.todos);

  const filterStatus = useAppSelector(state => state.filter.status) as Status;
  const filterQuery = useAppSelector(state => state.filter.query);

  const preparedTodos = getPreparedTodos(items, filterStatus);
  const filteredTodos = getFilteredByQuery(preparedTodos, filterQuery);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className="error-message">{error}</h1>;
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
              showModal={showModal}
              onOpenModal={onOpenModal}
            />
          ))}

          {!filteredTodos.length && !loading && <ErrorNotification />}
        </tbody>
      </table>
    </>
  );
};
