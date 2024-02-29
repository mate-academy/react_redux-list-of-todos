/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFilteredTodos } from '../../helpers/helpers';
import { actions as actionsCurTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(store => store.todos);
  const filter = useAppSelector(store => store.filter);
  const curentTodo = useAppSelector(store => store.currentTodo)
  const dispatch = useAppDispatch();

  const filteredTodos = getFilteredTodos(todos, filter)
  return (
    <>

      {filteredTodos.length < 1 ? (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
      ) : (
        
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
        {filteredTodos.map( todo => {
          return (
         <tr key={todo.id} data-cy="todo">
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
          {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
          </span>
          )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">{todo.title}</p>
          </td>

          <td className="has-text-right is-vcentered">
            <button onClick={() => dispatch(actionsCurTodo.setTodo(todo))} data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className={cn('far',
                    {
                      'fa-eye-slash': curentTodo?.id === todo.id,
                      'fa-eye': curentTodo?.id !== todo.id,
                    })} />
              </span>
            </button>
          </td>
        </tr>
          )
        })}
        </tbody>
      </table>
      )}
    </>
  );
};

