import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../types/Todo';
import { TODO_ACTIONS, TODO_SELECTORS } from '../../features/currentTodo';
import { TODOS_SELECTORS } from '../../features/todos';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(TODOS_SELECTORS.getPreparedTodos);
  const selectedTodo = useSelector(TODO_SELECTORS.getCurrentTodo);
  const selectedTodoId = selectedTodo?.id;
  const handleSetSelectedTodo = (todo: Todo) => dispatch(
    TODO_ACTIONS.setTodo(todo),
  );

  return (
    <>
      {todos.length <= 0 ? (
        <div>There is no todos</div>
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
            {todos.map(todo => (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': selectedTodoId === todo.id,
                })}
                key={todo.id}
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
                  <p className={todo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleSetSelectedTodo(todo)}
                  >
                    <span className="icon">
                      <i className={`far ${selectedTodoId === todo.id
                        ? 'fa-eye-slash'
                        : 'fa-eye'}`}
                      />
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
