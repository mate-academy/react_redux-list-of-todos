/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadedTodos } from '../../features/todos';
import classNames from 'classnames';
import { selectedTodo, setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { selectQuery, selectStatus } from '../../features/filter';

export enum FILTER {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

function filter(todos: Todo[], selectedFilter: FILTER, query: string) {
  let newTodos = [...todos];

  switch (selectedFilter) {
    case FILTER.ACTIVE:
      newTodos = newTodos.filter(todo => !todo.completed);
      break;

    case FILTER.COMPLETED:
      newTodos = newTodos.filter(todo => todo.completed);
      break;

    case FILTER.ALL:
    default:
      break;
  }

  if (query) {
    const newQuery = query.trim();

    newTodos = newTodos.filter(todo => {
      return todo.title.toLowerCase().includes(newQuery.toLowerCase());
    });
  }

  return newTodos;
}

export const TodoList: React.FC = () => {
  const todos = useSelector(loadedTodos);
  const todoModal = useSelector(selectedTodo);
  const selectedFilter = useSelector(selectStatus) as FILTER;
  const query = useSelector(selectQuery);
  const dispatch = useDispatch();

  const filteredTodos = filter(todos, selectedFilter, query);

  const handleSelectTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <>
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
      )}
    </>
  );
};
