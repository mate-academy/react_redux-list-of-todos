/* eslint-disable */
import React, { useEffect } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const field = useAppSelector(state => state.filter.status);
  const todos = useAppSelector(state => state.todos).todos;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const todosToRender = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase())).filter(todo => {
    switch(field.toLowerCase()) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;

      default:
        return true;
    }
  });

  const toggleTodo = (toggledTodo: Todo) => {
    dispatch(currentTodoSlice.actions.toggleTodo(toggledTodo));
  }

  return (
    <>
      {!todosToRender.length ? (
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
            {todosToRender.map(todo => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                    {todo.completed && 
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    }
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={classNames({
                    "has-text-danger": !todo.completed,
                    "has-text-success": todo.completed,
                  })}>{todo.title}</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button" onClick={() => toggleTodo(todo)}>
                    <span className="icon">
                      <i className={classNames('far', {
                        'fa-eye': todo.id !== currentTodo?.id,
                        'fa-eye-slash': todo.id === currentTodo?.id,
                      })}/>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
