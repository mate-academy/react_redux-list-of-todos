/* eslint-disable max-len */
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getFilterQuery,
  getFilterStatus,
  getSelectedTodo,
  getStateTodos,
  store,
} from '../../app/store';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const todos = useSelector(getStateTodos);
  const query: string = useSelector(getFilterQuery);
  const status: Status = useSelector(getFilterStatus);
  const selectedTodo: Todo | null = useSelector(getSelectedTodo);

  useEffect(() => {
    const preparedTodos = [...todos].filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    switch (status) {
      case 'all':
        setVisibleTodos(preparedTodos);
        break;

      case 'active':
        setVisibleTodos(preparedTodos.filter(todo => (
          !todo.completed
        )));
        break;

      case 'completed':
        setVisibleTodos(preparedTodos.filter(todo => (
          todo.completed
        )));
        break;

      default:
        throw new Error('status Error in TodoList');
    }
  }, [query, status, todos]);

  return (
    <>
      {visibleTodos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (

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
            {visibleTodos.map(todo => {
              return (
                <tr
                  data-cy="todo"
                  key={todo.id}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>
                  <td className="is-vcentered">
                    <p className={classnames({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    })}
                    >
                      {todo.title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => {
                        if (selectedTodo === null) {
                          store.dispatch(actions.setTodo(todo));
                        } else {
                          store.dispatch(actions.removeTodo());
                        }
                      }}
                    >
                      <span className="icon">
                        <i className={classnames('far', {
                          'fa-eye-slash': todo.id === selectedTodo?.id,
                          'fa-eye': todo.id !== selectedTodo?.id,
                        })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
