/* eslint-disable */
import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();

  const handleSelect = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  const showTodos = todos.map(todo => (
    <TodoItem todo={todo} key={todo.id} onSelect={handleSelect} />
  ));
  return (
    <>
      {!todos.length ? (
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

          <tbody>{showTodos}</tbody>
        </table>
      )}
    </>
  );
};
