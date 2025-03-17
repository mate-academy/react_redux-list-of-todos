import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type FilterCallback = (todo: Todo) => boolean;

const doesTodoMeetQuery = (todo: Todo, query: string) => {
  return todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
};

const getFilterOptionCallback = (
  query: string,
  option: Status,
): FilterCallback => {
  switch (option) {
    case 'all':
      return (todo: Todo) => doesTodoMeetQuery(todo, query);
    case 'active':
      return (todo: Todo) => !todo.completed && doesTodoMeetQuery(todo, query);
    case 'completed':
      return (todo: Todo) => todo.completed && doesTodoMeetQuery(todo, query);
    default:
      throw new Error('Filter option is not valid!!!');
  }
};

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(
    () => todos?.filter(getFilterOptionCallback(query, status)),
    [todos, query, status],
  );

  return (
    <>
      {filteredTodos.length ? (
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
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
