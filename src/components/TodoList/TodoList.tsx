/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {actions as currentTodoActions} from '../../features/currentTodo'
import cn from 'classnames';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos)
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.query.query);
  const filterByStatus = useAppSelector(state => state.query.status);
  const dispatch = useAppDispatch();

  const selectTodo = (todo: Todo) => {
    if (currentTodo === todo) {
      dispatch(currentTodoActions.clearCurrentTodo())
    } else {
      dispatch(currentTodoActions.setCurrentTodo(todo));
    }
  };
  const filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(query.trim().toLowerCase()))
    .filter((todo) => {
    switch (filterByStatus) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
  }
} )

  return (
    <>
      {filteredTodos.length < 1 && <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>}

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
          {filteredTodos.map((todo) => {
            return (
              <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed ? (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                ) : (
                  ''
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={cn({'has-text-danger': !todo.completed, 'has-text-success': todo.completed,})}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button" onClick={()=>selectTodo(todo)}>
                  <span className="icon" >
                  <i
                      className={cn('far', {
                        'fa-eye-slash': currentTodo === todo,
                        'fa-eye': currentTodo !== todo,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </>
  );
};
