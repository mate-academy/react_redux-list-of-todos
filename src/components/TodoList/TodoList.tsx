/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';
import { statusType } from '../../features/filter';

export const TodoList: React.FC = () => {
  const currentTodoDispatch = useDispatch();
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const onClickEye = (todo: Todo) => {
    currentTodoDispatch(actions.setTodo(todo));
  };

  useEffect(() => {
    switch (filter.status) {
      case statusType.ALL:
        setVisibleTodos(todos.filter((todo) => (
          todo.title.includes(filter.query)
        )));
        break;
      case statusType.ACTIVE:
        setVisibleTodos(todos.filter((todo) => (
          todo.title.includes(filter.query)
          && !todo.completed
        )));
        break;
      case statusType.COMPLETED:
        setVisibleTodos(todos.filter((todo) => (
          todo.title.includes(filter.query)
          && todo.completed
        )));
        break;
      default:
        setVisibleTodos(todos);
    }
  }, [filter, todos]);

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
          </tr>
        </thead>

        <tbody>
          {
            visibleTodos.length === 0 ? (
              <p className="notification is-warning">
                There are no todos matching current filter criteria
              </p>
            ) : (
              <>
                {
                  visibleTodos.map((todo) => (
                    <tr data-cy="todo">
                      <td className="is-vcentered">
                        {todo.id}
                      </td>
                      <td className="is-vcentered">
                        {todo.completed}
                      </td>

                      <td className="is-vcentered is-expanded">
                        <p className="has-text-danger">
                          {todo.title}
                        </p>
                      </td>

                      <td className="has-text-right is-vcentered">
                        <button
                          data-cy="selectButton"
                          className="button"
                          type="button"
                          onClick={() => onClickEye(todo)}
                        >
                          <span className="icon">
                            <i className="far fa-eye" />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </>
            )
          }
        </tbody>
      </table>
    </>
  );
};
