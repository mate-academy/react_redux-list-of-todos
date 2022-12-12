import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoInfo } from '../TodoInfo/TodoInfo';

function isContains(string: string, substring: string): boolean {
  return string.toLocaleLowerCase().includes(substring.toLocaleLowerCase());
}

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filterParams = useAppSelector(state => state.filter);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const getVisibleTodos = () => {
    const filteringTodos = todos.filter(
      todo => isContains(todo.title, filterParams.query),
    );

    switch (filterParams.status) {
      case 'active':
        setVisibleTodos(
          filteringTodos.filter(todo => !todo.completed),
        );
        break;

      case 'completed':
        setVisibleTodos(
          filteringTodos.filter(todo => todo.completed),
        );
        break;

      case 'all':
        setVisibleTodos(filteringTodos);
        break;

      default:
        setVisibleTodos(filteringTodos);
        break;
    }
  };

  useEffect(() => {
    getVisibleTodos();
  }, [filterParams]);

  return (
    <>
      {!visibleTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {visibleTodos.length !== 0 && (
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
              <tr data-cy="todo" key={todo.id}>
                <TodoInfo todo={todo} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
