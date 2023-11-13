import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as selectTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = filter;
  const dispatch = useAppDispatch();

  const onSelectTodo = (newTodo: Todo) => dispatch(
    selectTodoActions.setTodo(newTodo),
  );

  const filteredTodos: Todo[] = useMemo(() => {
    let preparedTodos = [...todos];

    if (status) {
      preparedTodos = preparedTodos.filter(todo => {
        switch (status) {
          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          case 'all':
            return todo;

          default:
            return todo;
        }
      });
    }

    if (query.trim()) {
      preparedTodos = preparedTodos
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return preparedTodos;
  }, [todos, filter, query]);

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
          const { id, title, completed } = todo;

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': currentTodo === todo,
              })}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames(
                    { 'has-text-danger': !completed },
                    { 'has-text-success': completed },
                  )}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelectTodo(todo)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far',
                      { 'fa-eye': currentTodo !== todo },
                      { 'fa-eye-slash': currentTodo === todo },
                    )}
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
