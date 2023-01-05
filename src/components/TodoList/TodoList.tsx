import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(store => store.todos);
  const filteration = useAppSelector(store => store.filter);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [downloadingTodos, setDownloadingTodos] = useState(false);

  const filtrationHandler = () => {
    switch (filteration.status) {
      case 'completed':
        return todos.filter(todo => todo.completed)
          .filter(todo => todo.title.includes(filteration.query));
      case 'active':
        return todos.filter(todo => !todo.completed)
          .filter(todo => todo.title.includes(filteration.query));
      default:
        return todos.filter(todo => todo.title.includes(filteration.query));
    }
  };

  useEffect(() => {
    setFilteredTodos(filtrationHandler());
  }, [filteration, todos]);

  useEffect(() => {
    setTimeout(() => {
      setDownloadingTodos(true);
    }, 500);
  }, []);

  return (
    <>
      {(filteredTodos.length === 0 && downloadingTodos) && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        {filteredTodos.length > 0 && (
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
        )}

        <tbody>
          {filteredTodos.map(todo => (
            <TodoInfo todo={todo} key={todo.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};
