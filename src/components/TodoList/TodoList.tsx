import React, { useEffect, useState } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

function getVisibleTodos(
  allTodos: Todo[],
  searchQuery: string,
  filter: Status,
): Todo[] {
  let filteredTodos = [...allTodos];

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();

    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(lowerQuery));
  }

  if (filter) {
    switch (filter) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }
  }

  return filteredTodos;
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const query = useAppSelector(state => state.filter.query);
  const filterByStatus = useAppSelector(state => state.filter.status);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    const newTodos = getVisibleTodos(todos, query, filterByStatus);

    setVisibleTodos(newTodos);
  }, [query, filterByStatus]);

  return (
    <>
      {visibleTodos.length === 0
        ? (
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
              {visibleTodos.map(todo => (
                <TodoItem todo={todo} key={todo.id} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
