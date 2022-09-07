import React, { useMemo } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../store';
import { SetSelectedTodoActionCreator } from '../../store/selectedTodo';
// import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useSelector(selectors.getTodos);
  const selectedTodoID = useSelector(selectors.getSelectedTodo);
  const despatch = useDispatch();

  const filteringBy = useSelector(selectors.getFilterBy);
  const query = useSelector(selectors.getQuery);

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      const { title, completed } = todo;

      if (!title.includes(query.toLowerCase())) {
        return false;
      }

      return filteringBy === 'all'
        ? true
        : completed === (filteringBy === 'completed');
    })
  ), [todos, filteringBy, query]);

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
        {visibleTodos.map(({ id, title, completed }) => (
          <tr
            data-cy="todo"
            key={id}
            className={cn({
              'has-background-info-light': selectedTodoID === id,
            })}
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
              <p className={`has-text-${completed ? 'success' : 'danger'}`}>
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => despatch(SetSelectedTodoActionCreator(id))}
              >
                <span className="icon">
                  <i className={
                    `far fa-eye${selectedTodoID === id ? '-slash' : ''}`
                  }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
