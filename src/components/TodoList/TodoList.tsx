import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleClickSelect = (todo: Todo) => dispatch(
    currentTodoActions.setTodo(todo),
  );

  useEffect(() => {
    const filteredTodos = todos
      .filter(todo => todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()))
      .filter(todo => {
        switch (status) {
          case 'completed':
            return todo.completed;

          case 'active':
            return !todo.completed;

          default:
            return true;
        }
      });

    setTodosList(filteredTodos);
  }, [status, todos, query]);

  return (
    <>
      {todosList.length === 0
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
        : (
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
              {todosList.map(todo => (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={todo === currentTodo
                    ? 'has-background-info-light'
                    : ''}
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
                    <p className={todo.completed
                      ? 'has-text-success'
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
                      onClick={() => handleClickSelect(todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames({
                            'far fa-eye-slash': todo === currentTodo,
                            'far fa-eye': todo !== currentTodo,
                          })}
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
