/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { TodoItem } from '../TodoItem/TodoItem';
import { filterTodos } from '../../features/filterTodos';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const handleSelectTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  const filteredTodos = filterTodos(todos, status, query);

  return (
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
          <TodoItem
            key={todo.id}
            todo={todo}
            currentTodoId={currentTodo?.id || null}
            onSelect={handleSelectTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
