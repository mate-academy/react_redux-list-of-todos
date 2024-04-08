import React, { useMemo } from 'react';
// import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  const dispatch = useAppDispatch();

  const filteredTodos: Todo[] = useMemo(() => {
    let copyTodos = [...todos];

    if (query) {
      copyTodos = copyTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    switch (status) {
      case Status.Active:
        return copyTodos.filter(todo => !todo.completed);

      case Status.Completed:
        return copyTodos.filter(todo => todo.completed);

      default:
        return copyTodos;
    }
  }, [query, status, todos]);

  if (!filteredTodos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

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
        {filteredTodos.map(todo => {
          const isSelectedTodo = currentTodo?.id === todo.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={isSelectedTodo ? 'has-background-info-light' : ''}
            >
              <td className="is-vcentered">{todo.id}</td>

              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}

              <td className="is-vcentered is-expanded">
                <p
                  className={`has-text-${!todo.completed ? 'danger' : 'success'}`}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={`far fa-eye${isSelectedTodo ? '-slash' : ''}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
