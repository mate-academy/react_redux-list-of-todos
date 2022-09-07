/* eslint-disable max-len */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { TODO_ACTIONS } from '../../features/currentTodo';
import { CURRENT_TODO_SELECT } from '../../features/selectors';
import { Todo } from '../../types/Todo';

interface Props {
  filteredTodos: Todo[],
}

export const TodoList: React.FC<Props> = (props) => {
  const { filteredTodos } = props;
  const selectTodo = useSelector(CURRENT_TODO_SELECT.currentTodo);
  const dispach = useDispatch();

  const handelActivetedModal = (todo: Todo) => {
    dispach(TODO_ACTIONS.setTodo(todo));
  };

  return (
    <>
      {filteredTodos.length < 0
       && (
         <p className="notification is-warning">
           There are no todos matching current filter criteria
         </p>
       )}

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
          { filteredTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className="has-background-info-light"
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
                <p className={cn(
                  { 'has-text-danger': !todo.completed },
                  { 'has-text-success': todo.completed },
                )}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handelActivetedModal(todo)}
                >
                  <span className="icon">
                    <i className={cn(
                      'far',
                      { 'fa-eye': todo.id !== selectTodo?.id || selectTodo === null },
                      { 'fa-eye-slash': selectTodo && todo.id === selectTodo.id },
                    )}
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
