/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, query } = useSelector((state: RootState) => state.filter);
  const todos = useSelector((state: RootState) => state.todos) as Todo[];
  const currTodo = useSelector((state: RootState) => state.currentTodo) as Todo | null;
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const filteredData = todos.filter((todo: Todo) => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });

    const searchData = filteredData.filter((todo: Todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );

    setVisibleTodos(searchData);
  }, [status, query, todos]);

  return (
    <>
      {visibleTodos.length === 0
        ? (<p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>)


        : (<table className="table is-narrow is-fullwidth">
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
              <tr key={todo.id} data-cy="todo" className="">
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
                    onClick={() =>
                      dispatch(currentTodoSlice.actions.currentTodo(todo))
                    }
                  >
                    <span className="icon">
                      <i
                        className={
                          todo.id === currTodo?.id
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
        </table>)
      }
    </>
  );
};
