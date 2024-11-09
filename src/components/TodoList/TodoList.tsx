/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleSelectTodo = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.addCurrentTodo(todo));
  };

  const preparedTodos = (todos: Todo[], query: string, filter: string) => {
    let preparedTodos = [...todos];

    if (query) {
      const modifiedQuery = query.toLocaleLowerCase();

      preparedTodos = preparedTodos.filter(todo =>
        todo.title.toLocaleLowerCase().includes(modifiedQuery),
      );
    }

    switch (filter) {
      case 'all':
        return preparedTodos;
      case 'active':
        return preparedTodos.filter(todo => !todo.completed);
      case 'completed':
        return preparedTodos.filter(todo => todo.completed);
      default:
        return preparedTodos;
    }
  };

  const todosToUse = preparedTodos(todos, query, status);

  return (
    <>
      {!todosToUse && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {todosToUse && (
        <table className="table is-narrow is-fullwidth">
          {todosToUse.length !== 0 && (
            <thead>
              <tr>
                <th>#</th>

                <th>
                  <span className="icon">
                    <i className="fas fa-check" />
                  </span>
                </th>

                <th>Title</th>
                <th></th>
              </tr>
            </thead>
          )}

          <tbody>
            {todosToUse.map(todo => (
              <tr key={todo.id} data-cy="todo">
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fa fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames('has-text-success', {
                      'has-text-danger': !todo.completed,
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
                    onClick={() => handleSelectTodo(todo)}
                  >
                    {
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': !currentTodo,
                            'fa-eye-slash': currentTodo === todo,
                          })}
                        />
                      </span>
                    }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
