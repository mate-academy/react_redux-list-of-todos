import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { TodoState } from '../../features/todos';
import { getVisibleTodos } from '../../helpers';

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector<TodoState>(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todosFilter = useAppSelector(state => state.filter);
  const selectDispatch = useAppDispatch();
  const visibleTodos
    = getVisibleTodos(todos, todosFilter.query, todosFilter.status);

  const handleOnSelect = (id: number) => {
    const selectedTodo = todos.find(todo => todo.id === id);

    if (selectedTodo) {
      selectDispatch(actions.setTodo(selectedTodo));
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
        {visibleTodos.map(todo => {
          const { completed, id, title } = todo;

          return (
            <tr
              data-cy="todo"
              className=""
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
                  className={classNames({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleOnSelect(id)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far',
                      { 'fa-eye-slash': currentTodo?.id === id },
                      { 'fa-eye': currentTodo?.id !== id },
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
