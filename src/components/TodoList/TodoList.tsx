/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import cn from 'classnames';
import { modalSlice } from '../../features/modalSlice';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const isTodosEmpty = !todos.length;
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state: RootState) => state.modal.isOpen);

  const filteredTodos = () => {
    const status = useSelector((state: RootState) => state.filter.status);
    const search = useSelector((state: RootState) =>
      state.filter.query.toLowerCase(),
    );
    const todos = useSelector((state: RootState) => state.todos);

    return todos.filter((todo: Todo) => {
      const titleMatches = todo.title.toLowerCase().includes(search);
      const isCompleted = todo.completed;

      if (status === 'all') {
        return titleMatches;
      } else if (status === 'completed') {
        return titleMatches && isCompleted;
      } else if (status === 'active') {
        return titleMatches && !isCompleted;
      }

      return titleMatches;
    });
  };

  const visibleTodos = filteredTodos();

  const handleOpenModal = (id: number) => {
    const currentTodo = todos.find((todo: Todo) => todo.id === id);
    dispatch(modalSlice.actions.openModal(true));
    dispatch(currentTodoSlice.actions.setCurrentTodo(currentTodo));
  };

  return (
    <>
      {isTodosEmpty ||
        (!visibleTodos.length && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        ))}
      <table className="table is-narrow is-fullwidth">
        {!!isTodosEmpty ||
          (visibleTodos.length > 0 && (
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
          ))}

        <tbody>
          {visibleTodos.map((todo: Todo, index: number) => {
            return (
              <tr data-cy="todo" key={`${todo.id}-${index}}`}>
                <td className="is-vcentered">{todo.id}</td>
                {todo.completed ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                ) : (
                  <td className="is-vcentered"> </td>
                )}

                <td className="is-vcentered is-expanded">
                  <p
                    className={cn({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    })}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleOpenModal(todo.id)}
                  >
                    <span className="icon">
                      <i
                        className={cn({
                          'far fa-eye': !modalIsOpen,
                          'far fa-eye-slash': modalIsOpen,
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
    </>
  );
};
