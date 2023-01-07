import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { Statuses } from '../../features/filter';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const dispatch = useDispatch();

  const setCurrentTodo = (todo: Todo) => dispatch(actions.setTodo(todo));

  const getTodosToDisplay = (
    todosFromDb: Todo [],
    curQuery: string,
    curStatus: string,
  ) : Todo [] => {
    let filteredTodos = [];

    switch (curStatus) {
      case Statuses.Completed:
        filteredTodos = todosFromDb.filter((todo: Todo) => todo.completed);
        break;
      case Statuses.Active:
        filteredTodos = todosFromDb.filter((todo: Todo) => !todo.completed);
        break;
      default:
        filteredTodos = todosFromDb;
    }

    let searchTodos = [];

    if (query) {
      searchTodos = filteredTodos
        .filter((todo: Todo) => todo.title.includes(curQuery));
    } else {
      searchTodos = filteredTodos;
    }

    return searchTodos;
  };

  const todosToDisplay = getTodosToDisplay(todos, query, status);

  return (
    <>
      {todosToDisplay.length > 0
        ? (
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
              {todosToDisplay.map(todo => (
                <React.Fragment key={todo.id}>
                  <tr
                    data-cy="todo"
                    className={todo.id === currentTodo?.id
                      ? 'has-background-info-light' : ''}
                  >
                    <td className="is-vcentered">
                      {todo.id}
                    </td>
                    <td className="is-vcentered">
                      {todo.completed
                        && <i className="fas fa-check" />}
                    </td>

                    <td className="is-vcentered is-expanded">
                      <p
                        className={todo.completed ? 'has-text-success'
                          : 'has-text-danger'}
                      >
                        {todo.title}
                      </p>
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => setCurrentTodo(todo)}
                      >
                        <span className="icon">
                          <i
                            className={todo.id === currentTodo?.id
                              ? 'far fa-eye-slash'
                              : 'far fa-eye'}
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )
        : (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}
    </>
  );
};
