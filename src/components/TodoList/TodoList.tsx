/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentTodo } from '../../features/currentTodo';


export const TodoList: React.FC = ({isLoading}) => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const query = filter.query;
  const status = filter.status;
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const visibleTodos = todos.filter(todo => {
    let matchQuery = query ? todo.title.toLowerCase().includes(query.toLowerCase()) : true;
    let matchFilter;

    switch (status) {
      case 'active': {
        matchFilter = !todo.completed;
        break;
      };
      case 'all': {
        matchFilter = true;
        break;
      };
      case 'completed': {
        matchFilter = todo.completed;
        break;
      };
    }

    return matchFilter && matchQuery;
  } )

  return (
    <>
      {visibleTodos.length > 0 ? (
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
          {visibleTodos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && <span className="icon" data-cy="iconCompleted"><i className="fas fa-check"></i></span>}
            </td>

            <td className="is-vcentered is-expanded">
              <p className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}>{todo.title}</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button" onClick={() => dispatch(setCurrentTodo(todo))}
>
                <span className="icon">
                  <i className={`${currentTodo?.id === todo.id ? "far fa-eye-slash" : "far fa-eye" }`}/>
                </span>
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      ) : (
        !isLoading && <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    )}
    </>
  );
};
