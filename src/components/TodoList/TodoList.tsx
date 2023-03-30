import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as ActionCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const filterQuery = useAppSelector(state => state.filter.query);
  const filterStatus = useAppSelector(state => state.filter.status);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const filterTodosByStatus = useMemo(() => {
    const todosCopy = [...todos];

    switch (filterStatus) {
      case Filter.COMPLETED: {
        return todosCopy.filter(({ completed }) => completed);
      }

      case Filter.ACTIVE: {
        return todos.filter(({ completed }) => !completed);
      }

      default:
        return todosCopy;
    }
  }, [filterStatus]);

  const todosForRender = useMemo(() => {
    const todosCopy = [...filterTodosByStatus];

    if (filterQuery) {
      return todosCopy.filter((todo: Todo) => todo.title.toLowerCase()
        .includes(filterQuery.toLowerCase()));
    }

    return todosCopy;
  }, [filterQuery, filterTodosByStatus]);

  const selectTodo = (todo: Todo) => {
    if (todo === currentTodo) {
      dispatch(ActionCurrentTodo.removeTodo());
    } else {
      dispatch(ActionCurrentTodo.setTodo(todo));
    }
  };

  return (
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
        {todosForRender.map((todo: Todo) => {
          const { id, title, completed } = todo;
          const color = completed ? 'success' : 'danger';

          return (
            <tr
              key={id}
              data-cy="todo"
            >
              <td className="is-vcentered">
                {id}
              </td>
              {completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}

              <td className="is-vcentered is-expanded">
                <p className={`has-text-${color}`}>
                  {title}
                </p>
              </td>
              {currentTodo?.id === id ? (
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  </button>
                </td>
              ) : (
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => selectTodo(todo)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
