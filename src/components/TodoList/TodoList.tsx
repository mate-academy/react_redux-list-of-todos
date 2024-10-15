import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../app/store';

import classNames from 'classnames';
import { TodoModal } from '../TodoModal';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTodoId, setActiveTodoId] = useState<number | null>(null);
  const todos = useAppSelector((state: RootState) => state.todos.items);
  const filterState = useAppSelector((state: RootState) => state.filter);
  const { query, status } = filterState;
  const dispatch = useDispatch();

  const handleTodoClick = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
    setActiveTodoId(todo.id);
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
                        <i
                          className={classNames('far', {
                            'fa-eye-slash': modalOpen && activeTodoId === id,
                            'fa-eye': !(modalOpen && activeTodoId === id),
                          })}
                        />
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
