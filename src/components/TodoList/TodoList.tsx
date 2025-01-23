import React from 'react';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const setSelectedTodo = (todo: Todo) =>
    dispatch(currentTodoSlice.actions.setCurrentTodo(todo));

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
        {todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p
                className={`has-text-${todo.completed ? 'success' : 'danger'}`}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={`far fa-eye${selectedTodo?.id === todo.id ? '-slash' : ''}`}
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
