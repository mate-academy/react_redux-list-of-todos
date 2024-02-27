import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { getTodos } from '../../api';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { actions as actionsTodos } from '../../features/todos';
import { actions as actionsCurrent } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';
import { selectFilter } from '../../features/filter';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(selectFilter);
  const currentTodo = useAppSelector(store => store.currentTodo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(true);
    getTodos().then(todosList => {
      dispatch(actionsTodos.setData(todosList));
      setIsFiltering(false);
      setIsLoading(false);
    });
  }, [dispatch]);

  const openModal = (todo: Todo) => {
    dispatch(actionsCurrent.setTodo(todo));
    setIsModalOpen(true);
  };

  const filteredTodos = todos?.filter((todo: Todo) => {
    const query = todo.title.toLowerCase().includes(filter.query.toLowerCase());
    const status =
      filter.status === 'all' ||
      (filter.status === 'active' && !todo.completed) ||
      (filter.status === 'completed' && todo.completed);

    return query && status;
  });

  return (
    <>
      {isLoading && <Loader />}
      {filteredTodos && filteredTodos.length > 0 && (
        <>
          <table className="table is-narrow is-fullwidth">
            <thead>
              <tr>
                <th>#</th>

                <th>
                  <span className="icon" aria-label="icon">
                    <i className="fas fa-check" />
                  </span>
                </th>

                <th>Title</th>
                <th aria-hidden="true"> </th>
              </tr>
            </thead>

            <tbody>
              {filteredTodos.map((todo: Todo) => (
                <tr key={todo.id} data-cy="todo">
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
                      className={cn('', {
                        'has-text-success': todo.completed,
                        'has-text-danger': !todo.completed,
                      })}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      aria-label="OpenModal"
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => openModal(todo)}
                    >
                      <span className="icon">
                        <i
                          className={cn('far', {
                            'fa-eye':
                              currentTodo === null ||
                              currentTodo.id !== todo.id,
                            'fa-eye-slash':
                              currentTodo && currentTodo.id === todo.id,
                          })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isModalOpen && <TodoModal />}
        </>
      )}

      {!isFiltering && !filteredTodos && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
