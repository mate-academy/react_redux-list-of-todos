/* eslint-disable max-len */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <>
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
          {todos.map((todo) => {
            const isTodoSelected = currentTodo?.id === todo.id;

            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                isSelected={isTodoSelected}
                onSelect={() => dispatch(actions.setTodo(todo))}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
