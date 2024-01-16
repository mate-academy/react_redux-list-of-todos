/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TodoModal } from '../TodoModal';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const currentTodoState = useAppSelector((state) => state.currentTodo);
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const filterStateTodos = useAppSelector((state) => state.filter);

  const visibeleTodoList = () => {
    const searchFilter = todos.filter((todo) => {
      return todo.title.includes(filterStateTodos.query);
    });

    return searchFilter.filter((todo) => {
      switch (filterStateTodos.filterBy) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });
  };

  const handleSelectTodo = (todoId: number) => {
    dispatch(currentTodoActions.activeTodoModal(true));

    const selectedTodo = visibeleTodoList().find((todo) => {
      return todo.id === todoId;
    });

    if (selectedTodo) {
      dispatch(currentTodoActions.setTodo(selectedTodo));

      return selectedTodo;
    }

    return null;
  };

  return (
    <>
      {visibeleTodoList().length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
              {visibeleTodoList().map((todo) => (
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
                      onClick={() => handleSelectTodo(todo.id)}
                    >
                      <span className="icon">
                        <i
                          className={cn('far', {
                            'fa-eye': todo.id !== currentTodoState.todo?.id,
                            'fa-eye-slash': todo.id === currentTodoState.todo?.id,
                          })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {currentTodoState.modalTodo && <TodoModal />}
    </>
  );
};
