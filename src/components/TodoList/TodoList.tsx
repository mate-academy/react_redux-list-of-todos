/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector, useAppDispatch } from '../../app/store';
import { loadedTodos } from '../../features/todos';
import { currentTodoSlice, isSelected } from '../../features/currentTodo';
import { selectQuery, selectStatus } from '../../features/filter';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

function filter(todos: Todo[], filterOption: Filter, query: string) {
  let filteredTodos = [...todos];

  switch (filterOption) {
    case Filter.ACTIVE:
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;

    case Filter.COMPLETED:
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;

    case Filter.ALL:
    default:
      break;
  }

  if (query) {
    const newQuery = query.trim().toLowerCase();
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.trim().toLowerCase().includes(newQuery),
    );
  }

  return filteredTodos;
}

export const TodoList: React.FC = () => {
  const todos = useAppSelector(loadedTodos);
  const todoModal = useAppSelector(isSelected);
  const filterOption = useAppSelector(selectStatus) as Filter;
  const query = useAppSelector(selectQuery);
  const dispatch = useAppDispatch();

  const filteredTodos = filter(todos, filterOption, query);

  const handleSelectTodo = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(todo));
  };

  return filteredTodos.length === 0 ? (
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredTodos.map(todo => (
          <tr data-cy="todo" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  todo.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleSelectTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye': !(todoModal && todoModal.id === todo.id),
                      'fa-eye-slash': todoModal && todoModal.id === todo.id,
                    })}
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
