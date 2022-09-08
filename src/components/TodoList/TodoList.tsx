/* eslint-disable max-len */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { selector } from '../../app/store';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos: Todo[] = useSelector(selector.getTodos);
  const selectedTodo = useSelector(selector.getSelectedTodo);

  return (
    <>
      {todos.length < 0
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
          {todos.map((todo) => (
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
                  className={todo.completed
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
                  onClick={() => (dispatch(actions.setTodo(todo)))}
                >
                  <span className="icon">
                    {selectedTodo?.id === todo.id
                      ? (<i className="far fa-eye-slash" />)
                      : (<i className="far fa-eye" />)}
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
