import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(store => store.todos);
  const filteration = useAppSelector(store => store.filter);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [downloadingTodos, setDownloadingTodos] = useState(false);

  const filtrationHandler = useCallback(() => {
    switch (filteration.status) {
      case Status.completed:
        return todos.filter(todo => todo.completed)
          .filter(todo => todo.title.includes(filteration.query));
      case Status.active:
        return todos.filter(todo => !todo.completed)
          .filter(todo => todo.title.includes(filteration.query));
      default:
        return todos.filter(todo => todo.title.includes(filteration.query));
    }
  }, [[], filteration]);

  useEffect(() => {
    const filtrationResult = filtrationHandler();

    setFilteredTodos(filtrationResult);
  }, [filtrationHandler]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDownloadingTodos(true);
    }, 500);

    return () => {
      clearTimeout(timeoutID);
    };
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
