import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const modalTodo = useAppSelector(state => state.currentTodo);
  const allTodos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filterTodos = (text: string, isDone: string, todos: Todo[]) => {
    let todosToFilter = [...todos];

    if (text) {
      todosToFilter = todosToFilter.filter(todo => todo.title.includes(text));
    }

    switch (isDone) {
      case 'all':
        return todosToFilter;
      case 'active':
        return todosToFilter.filter(todo => todo.completed === false);
      case 'completed':
        return todosToFilter.filter(todo => todo.completed === true);
      default:
        return todosToFilter;
    }
  };

  const handleSelect = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <>
      {allTodos.length > 0 ? (
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
            {filterTodos(query, status, allTodos).map(todo => (
              <tr key={todo.id} data-cy="todo">
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                  {' '}

                </td>

                <td className="is-vcentered is-expanded">
                  <p className={todo.completed
                    ? 'has-text-success' : 'has-text-danger'}
                  >
                    {todo.title}

                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    onClick={() => handleSelect(todo)}
                    type="button"
                  >
                    <span className="icon">
                      {modalTodo === todo
                        ? <i className="far fa-eye-slash" />
                        : <i className="far fa-eye" />}
                    </span>
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

    </>
  );
};
