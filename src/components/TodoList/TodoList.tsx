/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    todos,
    filter: {
      status,
      query,
    },
    currentTodo,
  } = useAppSelector((state) => state);

  const handleEye = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const filteredTodos = useMemo(() => {
    let copyTodo = [...todos];

    switch (status) {
      case 'active':
        copyTodo = copyTodo.filter((todo) => !todo.completed);
        break;

      case 'completed':
        copyTodo = copyTodo.filter((todo) => todo.completed);
        break;

      case 'all':
        break;

      default:
        return todos;
    }

    if (query) {
      copyTodo = copyTodo.filter((todo) => {
        return todo.title.toLowerCase().includes(query.toLowerCase().trim());
      });
    }

    return copyTodo;
  }, [todos, status, query]);

  return (
    <>
      {!filteredTodos.length && (
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
          {filteredTodos?.map((todo) => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames({
                'has-background-info-light': currentTodo?.id === todo.id,
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
                <p className={classNames(
                  todo.completed ? 'has-text-success' : 'has-text-danger',
                )}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleEye(todo as Todo)}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
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
