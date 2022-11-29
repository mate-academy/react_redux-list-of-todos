/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const filterParams = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const { query, status } = filterParams;

  const filteredTodos = useMemo(() => {
    const filteredByQuery = todos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

    switch (status) {
      case Status.Active:
        return filteredByQuery.filter(todo => !todo.completed);

      case Status.Completed:
        return filteredByQuery.filter(todo => todo.completed);

      default:
        return filteredByQuery;
    }
  }, [todos, query, status]);

  const selectTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const todoIsSelected = (todoId: number) => {
    if (selectedTodo) {
      return selectedTodo.id === todoId;
    }

    return false;
  };

  return (
    <>
      {!filteredTodos.length ? (
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
            {filteredTodos.map(todo => (
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

                <td className="is-vcentered is-expanded">
                  <p className={
                    todo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
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
                    onClick={() => selectTodo(todo)}
                  >
                    <span className="icon">
                      <i className={
                        `far
                        ${todoIsSelected(todo.id) ? 'fa-eye-slash' : 'fa-eye'}`
                      }
                      />
                    </span>
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
