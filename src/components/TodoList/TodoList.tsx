import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';
import { filtredTodos } from '../../function/filterFunc';
import { Status } from '../../types/Status';

interface State {
  query: string;
  status: Status;
}

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const filter = useSelector<RootState, State>(
    (state: RootState) => state.filter,
  );

  const filteredTodo = filtredTodos(todos, filter);

  const handleCurrentTodo = (todoItem: Todo) => {
    dispatch(setCurrentTodo(todoItem));
  };

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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {filteredTodo.map((todo: Todo) => (
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
                <p
                  className={classNames({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button">
                  <span
                    className="icon"
                    onClick={() => handleCurrentTodo(todo)}
                  >
                    <i
                      className={classNames('far', {
                        'fa-eye': currentTodo?.id !== todo.id,
                        'fa-eye-slash': currentTodo?.id === todo.id,
                      })}
                    />
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
