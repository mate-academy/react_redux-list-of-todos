/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import * as todosActions from '../../features/todos';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ todos, selectedTodo }) => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);

  const filteredTodos = useAppSelector(state => {
    const { query, status } = state.filter;
    let filtered = todos;
  
    if (query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase().trim())
      );
    }
  
    if (status === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }
  
    return filtered;
  });
  

  const handleSelectedTodo = (todo: Todo) => {
    dispatch(todosActions.setSelectedTodo(todo));
  };

  return (
    <>
      {query && !filteredTodos && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': todo.id === selectedTodo?.id,
              })}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed ? (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                ) : (
                  ''
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSelectedTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye-slash': todo.id === selectedTodo?.id,
                        'fa-eye': todo.id !== selectedTodo?.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
