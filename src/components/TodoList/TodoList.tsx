/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { TodoModal } from '../TodoModal/TodoModal';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, currentTodo, filter } = useAppSelector(state => state);
  const [preparedTodos, setPreparedTodos] = useState <Todo[]>([]);

  useEffect(() => {
    let filteredTodos = filter.status === 'completed'
      ? todos.filter(item => item.completed)
      : filter.status === 'active'
        ? todos.filter(item => !item.completed)
        : [...todos];

    if (filter.query) {
      filteredTodos = filteredTodos.filter(item =>
               item.title.toLowerCase().includes(filter.query.toLowerCase()),
             )
    }

    setPreparedTodos(filteredTodos);
  }, [todos, filter]);

  return (
    <>
      { preparedTodos.length <= 0
          ? <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          : < table className="table is-narrow is-fullwidth">
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
            {preparedTodos.map((todo: Todo) => (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': currentTodo?.id === todo.id,
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
                  <p
                    className={classNames({
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
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
                    onClick={() => {
                      dispatch(currentTodoSlice.actions.setCurrentTodo(todo));
                      // setSelected(prev => (prev?.id === todo.id ? null : todo));
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye-slash': currentTodo?.id === todo.id,
                          'fa-eye': currentTodo?.id !== todo.id,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}

      {currentTodo && <TodoModal />}
    </>
  );
};
