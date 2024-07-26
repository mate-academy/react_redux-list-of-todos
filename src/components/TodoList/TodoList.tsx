/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo, setCurrentUser } from '../../features/currentTodo';
import { getUser } from '../../api';
import { Status } from '../../types/Status';
import { RootState } from '../../app/store';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const status = useSelector((state: RootState) => state.filter.status);
  const query = useSelector((state: RootState) => state.filter.query);
  const currentTodo = useSelector((state: RootState) => state.currentTodo.todo);

  const handleFilterTodos = (statusOfTodos: Status, searchQuery = '') => {
    let filteredTodos: Todo[] = [...todos];

    switch (statusOfTodos) {
      case Status.active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case Status.completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      case Status.all:
      default:
        filteredTodos = todos;
        break;
    }

    if (searchQuery) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredTodos;
  };

  const dispatch = useDispatch();

  const visibleTodos = handleFilterTodos(status, query);

  const handleCurrentTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));

    getUser(todo.userId).then((user) => {
      dispatch(setCurrentUser(user));
    });
  };

  return (
    <>
      {visibleTodos.length === 0 ? (
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
          {visibleTodos.map(todo => (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed ? (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                ) : (<></>)}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleCurrentTodo(todo)}
                >
                  <span className="icon">
                    <i className={`far ${currentTodo === todo ? 'fa-eye-slash' : 'fa-eye'}`} />
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
