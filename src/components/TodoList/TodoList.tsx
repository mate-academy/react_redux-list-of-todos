/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPreparedTodos } from '../../utils/getPreparedTodos';
import { currentTodoSlice } from '../../features/currentTodo';



export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filterParams = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch()

  const preparedTodos = getPreparedTodos(todos, filterParams);

  return (
    <>
      {!preparedTodos.length ? (<p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>) : (
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
            {preparedTodos.map(todo => {
              const isCurrent = todo.id === currentTodo?.id;
              const {id, completed, title } = todo;

              return (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={cn({ 'has-background-info-light': isCurrent })}
                >
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={`has-text-${completed ? 'success' : 'danger'}`}>{title}</p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(currentTodoSlice.actions.setTodo(todo))}
                    >
                      <span className="icon">
                        <i className={`far fa-eye${isCurrent ? '-slash' : ''}`} />
                      </span>
                    </button>
                  </td>
                </tr>
              )
            } )}
          </tbody>
        </table>
      )}
    </>
  );
};
