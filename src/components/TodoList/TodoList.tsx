/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const visibleTodos = useAppSelector<Todo[]>(state => state.todos.todos);

  const setCurrentTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  return (
    <>
      {visibleTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
            <tr
              data-cy="todo"
              className={cn({ 'has-background-info-light': selectedTodo === todo })}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed
                ? (
                  <>
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                    <td className="is-vcentered is-expanded">
                      <p className="has-text-success">{todo.title}</p>
                    </td>
                  </>

                )
                : (
                  <>
                    <td className="is-vcentered" />
                    <td className="is-vcentered is-expanded">
                      <p className="has-text-danger">
                        {todo.title}
                      </p>
                    </td>
                  </>

                )}

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setCurrentTodo(todo)}
                >
                  <span className="icon">
                    <i className={selectedTodo === todo
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'}
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
