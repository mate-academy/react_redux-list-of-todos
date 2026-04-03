/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  onShow: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ todos, onShow, selectedTodo }) => {
  const handleClick = (todo: Todo) => {
    onShow(todo);
  };

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
        {todos.map(todo => {
          const isSelected = selectedTodo?.id === todo.id;

          return (
            <tr data-cy="todo" className="has-background-light" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                <span
                  className={cn('icon', {
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                  data-cy={todo.completed ? 'iconCompleted' : undefined}
                >
                  <i className={cn('fas', { 'fa-check': todo.completed })} />
                </span>
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
                  onClick={() => handleClick(todo)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye-slash': isSelected,
                        'fa-eye': !isSelected,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
