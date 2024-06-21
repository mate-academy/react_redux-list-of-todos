/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { currentTodoSlice } from '../../features/currentTodo';
import classNames from 'classnames';


export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos =  useAppSelector(state => state.todos);
  const filteres = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filteredTodo = () => {
    let filteredTodos = todos;
    switch(filteres.status){
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      default:
        filteredTodos = todos;
    }

    if (filteres.query){
      filteredTodos = filteredTodos.filter(todo => {
        const reg = new RegExp(filteres.query, 'i');
        return reg.test(todo.title);
      });
    }

    return filteredTodos;
  };


  return (
    <>
    {todos.length > 0 && !filteredTodo().length && (
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
          {filteredTodo().map(todo => {
            const { id, title, completed} = todo;

            return(
              <tr data-cy="todo" className={classNames({
                'has-background-info-light' : currentTodo?.id === id
              })}>
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={classNames({
                  'has-text-success' : completed,
                  'has-text-danger' : !completed,
                })}>{title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(currentTodoSlice.actions.addTodo(todo))}
                >
                  <span className="icon" >
                    {currentTodo?.id === id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
            )
          } ) }
        </tbody>
      </table>
    </>
  );
};
