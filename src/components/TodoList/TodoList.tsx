/* eslint-disable */
import React from 'react';
import { TodoItem } from './components';
import { useAppSelector } from '../../app/hooks';

type Props = {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};


export const TodoList: React.FC<Props> = ({setIsActive}) => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filtererTodos = () => {
    const filteredByQuery = todos.filter(todo => todo.title.includes(query));

    switch (status) {
      case 'all':
        return [...filteredByQuery];
      case 'active':
        return filteredByQuery.filter(todo => !todo.completed);
      case 'completed':
        return filteredByQuery.filter(todo => todo.completed);
      default:
        return filteredByQuery;
    }
  };

  const filteredTodos = filtererTodos();

  return (
    <>
      {filteredTodos && filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {filteredTodos && filteredTodos.length > 0 && (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} setIsActive={setIsActive} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
