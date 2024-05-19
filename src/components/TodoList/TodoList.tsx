/* eslint-disable */
import React, { useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);

  useMemo(() => {
    const { status, query } = filter;
    const normalizedQuery = query.toLowerCase();

    setFilteredTodos(
      todos.filter(todo => {
        return (
          (status === 'completed'
            ? todo.completed
            : status === 'active'
              ? !todo.completed
              : true) && todo.title.toLowerCase().includes(normalizedQuery)
        );
      }),
    );
  }, [filter, todos]);

  const onSelect = (todo: Todo) => dispatch(actions.setTodo(todo));

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
        {filteredTodos.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={
              todo.id === currentTodo?.id ? 'has-background-info-light' : ''
            }
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
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
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
                  onSelect(todo);
                }}
              >
                <span className="icon">
                  <i
                    className={`far fa-eye${todo.id === currentTodo?.id ? '-slash' : ''}`}
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
