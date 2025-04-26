/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../enum/Filter';
import { isOpened, setCurrentTodo } from '../../features/currentTodo';

function sortTodo(allTodos: Todo[], query: string, filter: Filter): Todo[] | [] {
  let filteredTodos = allTodos;
  if (query) {
    filteredTodos = allTodos.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase())
    )
  }

  switch (filter) {
    case Filter.Active:
      return filteredTodos.filter(todo => !todo.completed);
    case Filter.Completed:
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
}

export const TodoList: React.FC = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const { currentTodo, opened } = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch<AppDispatch>();
  const sortedTodo = sortTodo(todos, query, status);

  const handleChangeEye = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
    if (todo) {
      dispatch(isOpened(true));
    }
  }

  return (
    <>
      {sortedTodo.length === 0 ? (
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
            {sortedTodo.map(todo => (
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
                  <p className={classNames(
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  )}>{todo.title}</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button" onClick={() => handleChangeEye(todo)}>
                    <span className="icon">
                    {currentTodo?.id === todo.id && opened ? (
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
