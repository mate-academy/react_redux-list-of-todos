import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getTodos } from './../../api';
import { actions as todosActions } from '../../features/todos';
import { FilterTypes } from '../../features/filter';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos().then(result => {
      dispatch(todosActions.addTodos(result));
    });
  }, [dispatch]);

  const handleSetSelectedTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setCurrentTodo(todo));
  };

  const visibleTodos = useMemo(() => {
    let currentTodos = [...todos];

    switch (filter.status) {
      case FilterTypes.Active:
        currentTodos = currentTodos.filter(todo => !todo.completed);
        break;

      case FilterTypes.Completed:
        currentTodos = currentTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    if (filter.query.trim()) {
      currentTodos = currentTodos.filter(todo =>
        todo.title.includes(filter.query),
      );
    }

    return currentTodos;
  }, [todos, filter]);

  return (
    <>
      {false && (
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
          {visibleTodos.map(todo => (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames(
                    { 'has-text-danger': !todo.completed },
                    { 'has-text-success': todo.completed },
                  )}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button">
                  <span
                    onClick={() => handleSetSelectedTodo(todo)}
                    className="icon"
                  >
                    <i
                      className={classNames(
                        'far',
                        {
                          'fa-eye-slash':
                            (currentTodo.todo ? currentTodo.todo.id : -1) ===
                            todo.id,
                        },
                        {
                          'fa-eye':
                            (currentTodo.todo ? currentTodo.todo.id : -1) !==
                            todo.id,
                        },
                      )}
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
