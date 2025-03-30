/* eslint-disable */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { actions as currentTodoAction } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(s => s.todos)
  const currentTodo = useAppSelector(s => s.currentTodo)
  const { query, status } = useAppSelector(s => s.filter)

  function hanndleOnClick(t: Todo) {
    dispatch(currentTodoAction.addCurrentTodo(t))
  }

  const visibleTodos = useMemo(() => {
    const normalizeQuery = query.toLocaleLowerCase();
    let newListTodos = [...todos]

    if (status === 'active') {
      newListTodos = newListTodos.filter(c => !c.completed)
    } else if (status === 'completed') {
      newListTodos = newListTodos.filter(c => c.completed)
    }

    if (normalizeQuery) {
      newListTodos = newListTodos.filter(c => c.title.toLocaleLowerCase().includes(normalizeQuery))
    }

    return newListTodos;
  }, [query, status, todos])

  return (
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
            key={todo.id}
            data-cy="todo"
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
              <button data-cy="selectButton" className="button" type="button" onClick={() => hanndleOnClick(todo)}>
                <span className="icon">
                  <i
                  className={
                    todo.id === currentTodo?.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'
                  }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
