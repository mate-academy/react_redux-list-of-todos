import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useDispatch();
  const currTodo = useAppSelector(state => state.currentTodo);

  const handleStatus = (currTodos: Todo[]) => {
    if (status === 'all') {
      return currTodos;
    } else if (status === 'active') {
      return currTodos.filter(todo => !todo.completed);
    }

    return currTodos.filter(todo => todo.completed);
  };

  const filteredTodos = handleStatus(todos).filter(todo =>
    todo.title.toLowerCase().includes(query.trimStart().toLowerCase()),
  );

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
        {filteredTodos.map((todo: Todo) => (
          <tr data-cy="todo" className="" key={todo.id}>
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
                  dispatch(currentTodoSlice.actions.add(todo));
                }}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye-slash': todo === currTodo,
                      'fa-eye': todo !== currTodo,
                    })}
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
