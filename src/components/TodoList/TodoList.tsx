import { useMemo } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filterParams = useAppSelector(state => state.filter);

  const setTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const filteredTodos = useMemo(() => {
    const todoFilter = todos.filter(currTodo => {
      const preparedTodo = currTodo.title.toLowerCase();
      const preparedQuery = filterParams.query.toLowerCase();

      return preparedTodo.includes(preparedQuery);
    });

    switch (filterParams.status) {
      case 'all':
        return todoFilter;

      case 'active':
        return todoFilter.filter(currTodo => currTodo.completed === false);

      case 'completed':
        return todoFilter.filter(currTodo => currTodo.completed === true);

      default:
        return todoFilter;
    }
  }, [todos, filterParams]);

  return (
    <>
      {filteredTodos.length === 0 ? (
        <h1 className="notofication is-warning">
          There are not todos matching current filter criteria
        </h1>
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
            {filteredTodos.map(currTodo => (
              <tr
                data-cy="todo"
                key={currTodo.id}
              >
                <td className="is-vcentered">
                  {currTodo.id}
                </td>
                {currTodo.completed ? (
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
                    className={currTodo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'}
                  >
                    {currTodo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setTodo(currTodo)}
                  >
                    <span className="icon">
                      <i className={classNames('far', {
                        'fa-eye-slash': currentTodo?.id === currTodo.id,
                        'fa-eye': currentTodo?.id !== currTodo.id,
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
