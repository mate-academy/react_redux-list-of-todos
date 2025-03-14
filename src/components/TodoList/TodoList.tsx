/* eslint-disable */

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, setTodo } from '../../app/store';
import { Todo } from '../../types/Todo';
import { useEffect, useState } from 'react';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const TodoList = useSelector((state: RootState) => state.todos);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const filter = useSelector((state: RootState) => state.filter);

  const [processedList, setProcessedList] = useState(TodoList);

  const handleSelectTodo = (todo: Todo) => {
    dispatch(setTodo(todo));
  };

  useEffect(() => {
    let FilteredList;

    if (filter.status === 'active') {
      FilteredList = TodoList.filter(todo => !todo.completed);
    } else if (filter.status === 'completed') {
      FilteredList = TodoList.filter(todo => todo.completed);
    } else {
      FilteredList = [...TodoList];
    }

    if (filter.query.length) {
      FilteredList = FilteredList.filter(todo =>
        todo.title.toLowerCase().includes(filter.query.toLowerCase()),
      );
    }

    setProcessedList(FilteredList);
  }, [filter.query, filter.status, TodoList]);

  return (
    <>
      {processedList.length === 0 ? (
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
            {processedList.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={
                  currentTodo?.id === todo.id ? 'has-background-info-light' : ''
                }
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      handleSelectTodo(todo);
                    }}
                  >
                    <span className="icon">
                      <i
                        className={
                          currentTodo?.id === todo.id
                            ? 'far fa-eye-slash'
                            : 'far fa-eye'
                        }
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
