/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { fetchTodos } from '../../features/todos';
import { useSelector } from 'react-redux';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const currentTodo = useSelector(
    (state: { currentTodo: Todo | null }) => state.currentTodo,
  );
  const filterQuery = useSelector(
    (state: { filter: { query: string } }) => state.filter.query,
  );
  const filterStatus = useSelector(
    (state: { filter: { status: string } }) => state.filter.status,
  );
  const dispatch = useAppDispatch();

  const { todos, status } = useAppSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const sortProducts = (todos: Todo[], filterStatus: string) => {
    switch (filterStatus) {
      case 'active':
        return todos.filter(todo => todo.completed === false);
      case 'completed':
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  };

  const filteredTodos = sortProducts(todos, filterStatus);
  const displayedTodos = filterQuery
    ? filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(filterQuery.toLowerCase()),
      )
    : filteredTodos;

  const handleOpenModal = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  if (status === 'loading') {
    return <Loader />;
  }
  if (status === 'failed') {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <>
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
          {displayedTodos.map(todo => (
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
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleOpenModal(todo)}
                >
                  <span className="icon">
                    <i
                      className={`far ${currentTodo !== todo ? 'fa-eye' : 'fa-eye-slash'}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
