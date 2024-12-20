/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';


export const TodoList: React.FC = () => {
  const todos: Todo[] = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch(); // Диспетчер для отправки действий

  const filteredTodosByQuery = todos.filter(todo => todo.title.toLowerCase().includes(filter.query.toLowerCase()));
  const currentTodo = useAppSelector(state => state.currentTodo);

  let filteredTodos: Todo[];

  if (filter.status === 'all') {
    filteredTodos = filteredTodosByQuery;
  } else if (filter.status === 'completed') {
    filteredTodos = filteredTodosByQuery.filter(todo => todo.completed === true);
  } else {
    filteredTodos = filteredTodosByQuery.filter(todo => todo.completed === false);
  }

  const handleSelect = (todo: Todo) => {
    const curTodo = currentTodo !== null ? null : todo;
    dispatch(setCurrentTodo(curTodo));
  };


  return (
    <>
      {filteredTodos.length === 0 && (
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
          {filteredTodos.map(todo => (
            <tr data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed === true && (<span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>)}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button" onClick={() => handleSelect(todo)}>
                  <span className="icon">
                    <i className={classNames('far',{
                      'fa-eye': currentTodo?.id !== todo.id,
                      'fa-eye-slash': currentTodo?.id === todo.id,
                    })} />
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
