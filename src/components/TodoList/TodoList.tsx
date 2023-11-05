/* eslint-disable max-len */
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

enum TodosFilterBy {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector((state) => state.currentTodo);
  const setSelectionTodo = (todo: Todo) => dispatch(actions.setTodo(todo));
  const { status, query } = useAppSelector((state) => state.filter);

  const getVisibleTodos = (
    todosVis: Todo[],
    queryForVisible: string,
    statusForVisible: Status,
  ) => {
    let visibleTodos = [...todosVis];
    const newQuery = queryForVisible.toLowerCase().trim();

    if (queryForVisible) {
      visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(newQuery));
    }

    switch (statusForVisible) {
      case TodosFilterBy.All:
      default:
        return visibleTodos;

      case TodosFilterBy.Completed:
        return visibleTodos.filter(todo => todo.completed);

      case TodosFilterBy.Active:
        return visibleTodos.filter(todo => !todo.completed);
    }
  };

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, query, status);
  }, [todos, query, status]);

  return (
    <>
      {visibleTodos.length !== 0 ? (
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
            {visibleTodos.map((todo) => (
              <tr key={todo.id} data-cy="todo">
                <td className="is-vcentered">
                  {todo.id}
                </td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={classNames({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
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
                    onClick={() => setSelectionTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye-slash': selectedTodo?.id === todo.id,
                          'fa-eye': selectedTodo?.id !== todo.id,
                        })}
                      />
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
