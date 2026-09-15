/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../Todo/Todo';
import { currentTodoActions } from '../../features/currentTodo';
import { Todo as TodoType } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { Status } from '../../types/Status';

interface FilterOptions {
  status?: Status;
  query?: string;
}

const getPreparedTodos = (
  todos: TodoType[],
  { status, query }: FilterOptions = {},
) => {
  let todosCopy = [...todos];

  if (status) {
    todosCopy = todosCopy.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });
  }

  if (query) {
    todosCopy = todosCopy.filter(todo =>
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }

  return todosCopy;
};

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todosState = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filterState = useAppSelector(state => state.filter);

  const handleTodoSelect = (todo: TodoType) =>
    dispatch(currentTodoActions.setCurrentTodo(todo));

  const preparedTodos = getPreparedTodos(todosState.todos, {
    status: filterState.status,
    query: filterState.query,
  });

  let content: React.ReactNode = null;

  if (preparedTodos.length === 0) {
    content = (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  } else {
    content = (
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
          {preparedTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              currentTodoId={currentTodo?.id || 0}
              onSelect={handleTodoSelect}
            />
          ))}
        </tbody>
      </table>
    );
  }

  return <>{content}</>;
};
