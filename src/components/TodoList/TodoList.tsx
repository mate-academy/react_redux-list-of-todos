/* eslint-disable max-len */
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

function hightlight(filter: string, text: string) {
  if (!filter) {
    return text;
  }

  const regexp = new RegExp(filter, 'ig');
  const matchValue = text.match(regexp);

  if (matchValue) {
    return text.split(regexp).map((symbol, index, array) => {
      if (index < array.length - 1) {
        const matchSymbol = matchValue.shift();

        return (
          <>
            {symbol}
            <span className="hightlight">{matchSymbol}</span>
          </>
        );
      }

      return symbol;
    });
  }

  return text;
}

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const isSelected = (todo: Todo) => selectedTodo?.id === todo.id;
  const query = useAppSelector(state => state.filter.query);

  const visibleTodos = useAppSelector(({ filter, todos }) => {
    return todos.filter(todo => {
      const queryTodos = todo.title.toLowerCase().includes(filter.query.trim().toLowerCase());

      switch (filter.status) {
        case 'all':
          return queryTodos;
        case 'active':
          return queryTodos && !todo.completed;
        case 'completed':
          return queryTodos && todo.completed;
        default:
          return true;
      }
    });
  });

  const light = useCallback((text: string) => {
    return hightlight(query, text);
  }, [query]);

  return (
    <>
      {visibleTodos.length === 0
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
              {visibleTodos.map(todo => (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className=""
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed
            && (
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
                      {light(todo.title)}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(
                        actions.setTodo(todo),
                      )}
                    >
                      <span className="icon">
                        <i className={isSelected(todo)
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'}
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
