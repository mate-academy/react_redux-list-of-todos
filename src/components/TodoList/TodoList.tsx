/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';


type Props = {
  todoList: Todo[];
}

export const TodoList: React.FC<Props> = ({ todoList }) => {

  const dispatch = useDispatch();

  const setCurrentTodo = (todo: Todo) => dispatch(actions.setTodo(todo));

  
  return (
    <>
      {todoList.length === 0 && (
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
          {todoList &&
            todoList.map(todo => {
              return (
                <tr data-cy="todo" key={todo.id}>
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered"> </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames({
                        'has-text-danger': !todo.completed,
                        'has-text-success': todo.completed
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
                    >
                      <span className="icon" onClick={() => setCurrentTodo(todo)}>
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
