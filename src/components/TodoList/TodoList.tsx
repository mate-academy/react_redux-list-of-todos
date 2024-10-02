import React from 'react';
import { Todo } from '../../types/Todo';
import classnames from 'classnames';
import { useAppSelector } from '../../utils/hooks';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { getFilteredTodos } from '../../utils/filter';

export const TodoList: React.FC = () => {
  const todos: Todo[] = useAppSelector(state => state.todos);
  const selectedTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);

  const filteredTodos = getFilteredTodos(todos, filter);

  const dispatch = useDispatch();

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
        {filteredTodos.map(todo => {
          return (
            <tr
              data-cy="todo"
              className={classnames({
                'has-background-info-light': selectedTodo,
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
                  className={classnames({
                    'has-text-danger': todo.completed === false,
                    'has-text-success': todo.completed === true,
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
                  onClick={() => dispatch(setCurrentTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={classnames('far', {
                        'fa-eye-slash': selectedTodo?.id === todo.id,
                        'fa-eye': selectedTodo?.id !== todo.id,
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
