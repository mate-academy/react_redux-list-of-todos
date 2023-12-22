/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  setModel: (isOpen: boolean) => void,
};

export const TodoList: React.FC<Props> = ({ setModel }) => {
  const todos
    = useAppSelector(state => state.todos);
  const currentTodo
    = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  const handleClickSelectBtn = (todo: Todo) => {
    setModel(true);
    dispatch(currentTodoActions.setTodo(todo));
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
        {
          todos.map(todo => (
            <tr
              data-cy="todo"
              className=""
              key={todo.id}
            >
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
                <p className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleClickSelectBtn(todo)}
                >
                  <span className="icon">
                    <i className={currentTodo?.id !== todo.id
                      ? 'far fa-eye'
                      : 'far fa-eye-slash'}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
