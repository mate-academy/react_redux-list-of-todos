import { useEffect } from 'react';

import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { actions as todosActions } from '../../features/todos';

import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { Select } from '../../helpers/SelectEnum';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos: Todo[] = useAppSelector(state => state.todos);
  const data = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then((tds) => {
        dispatch(todosActions.getTodos(tds));
      });
  }, [dispatch]);

  const normalizedQuery = data.query.toLowerCase().trim();

  let filteredTodos = todos.filter(todo => (
    todo.title.toLowerCase().trim().includes(normalizedQuery)
  ));

  const toggleTodos = () => {
    switch (data.status) {
      case Select.all:
        return filteredTodos;

      case Select.active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);

        return filteredTodos;

      case Select.completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);

        return filteredTodos;

      default:
        return filteredTodos;
    }
  };

  toggleTodos();

  return (
    <>
      { /*eslint-disable */ }

      {filteredTodos.length === 0 ? (
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
            {filteredTodos.map((todo) => (
              <tr
                data-cy="todo"
                key={todo.id}
              >
                <td className="is-vcentered">{todo.id}</td>

                {todo.completed ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                ) : (
                  <td className="is-vcentered"> </td>
                )}

                <td className="is-vcentered is-expanded">
                  <p
                    className={cn("has-text-success", {
                      "has-text-danger": !todo.completed
                    })}>
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    onClick={() => {
                      dispatch(currentTodoActions.setTodo(todo))
                    }}
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      {todo.id === currentTodo?.id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
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
