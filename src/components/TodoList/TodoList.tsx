/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../app/store';
import {
  setError,
  setLoading,
  setTodos,
  setEndLoading,
} from '../../features/todos';
import classNames from 'classnames';
import { TodoModal } from '../TodoModal';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const todos = useAppSelector((state: RootState) => state.todos.items);
  const filterState = useAppSelector((state: RootState) => state.filter);
  const statusLoading = useAppSelector(
    (state: RootState) => state.todos.status,
  );
  const { query, status } = filterState;

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(setLoading());
      try {
        const fetchedTodos = await getTodos();
        dispatch(setTodos(fetchedTodos));
      } catch (error) {
        console.error('Failed to fetch todos:', error);
        dispatch(setError());
      } finally {
        dispatch(setEndLoading());
      }
    };

    fetchTodos();
  }, [dispatch]);

  const handleTodoClick = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
    setModalOpen(true);
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    if (status === 'all') {
      return matchesQuery;
    } else if (status === 'active') {
      return matchesQuery && !todo.completed;
    } else if (status === 'completed') {
      return matchesQuery && todo.completed;
    }

    return false;
  });

  return (
    <>
      {filteredTodos.length > 0 ? (
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
              const { title, id, completed } = todo;
              return (
                <tr data-cy="todo" key={id}>
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed ? (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    ) : (
                      ''
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames({
                        'has-text-success': completed === true,
                        'has-text-danger': completed === false,
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
                      onClick={() => handleTodoClick(todo)}
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
      {modalOpen && <TodoModal onClose={setModalOpen} />}
    </>
  );
};
