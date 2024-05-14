/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSortedTodos } from '../../helpers/getSortedTodos';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

type TodoListProps = {
  loading: boolean;
};

export const TodoList: React.FC<TodoListProps> = ({ loading }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = getSortedTodos(todos, { status, query });
  const thereIsNothingToShow = !loading && !todos.length;

  const handleSetNewTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {thereIsNothingToShow && (
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
          {filteredTodos.map(todo => (
            <tr
              data-cy="todo"
              key={todo.id}
              {...(currentTodo &&
                currentTodo.id === todo.id && {
                  className: 'has-background-info-light',
                })}
            >
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
                  className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
                >
                  {todo.title}
                </p>
              </td>

              {/* todo: change eye styles */}

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSetNewTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={`far ${currentTodo && currentTodo.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
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
