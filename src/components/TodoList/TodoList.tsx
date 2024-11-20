/* eslint-disable */
import React from 'react';
import { filtredTodos } from '../../features/filter';
import { selector } from '../../app/store';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const filter = selector(state => state.filter);
  const todos = selector(state => state.todos);
  const currentTodo = selector(state => state.currentTodo);
  const dispatch = useDispatch();

  const filtredArrayOfTodos = filtredTodos(todos, filter);

  return (
    <>
      {filtredArrayOfTodos.length === 0 && (
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
          {filtredArrayOfTodos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={!todo.completed && "has-text-danger" || "has-text-success"} >{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button">
                  <span className="icon" onClick={() => dispatch(setCurrentTodo(todo))}>
                    <i className={currentTodo !== todo && "far fa-eye" || "far fa-eye-slash"} />
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
