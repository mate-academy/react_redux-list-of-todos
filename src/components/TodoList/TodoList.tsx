/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../Todo/Todo';
import { currentTodoActions } from '../../features/currentTodo';
import { Todo as TodoType } from '../../types/Todo';
import { useDispatch } from 'react-redux';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todosState = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleTodoSelect = (todo: TodoType) =>
    dispatch(currentTodoActions.setCurrentTodo(todo));

  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

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
          {todosState.todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              currentTodoId={currentTodo?.id || 0}
              onSelect={handleTodoSelect}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
