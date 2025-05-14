import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const filterTodos = (
  todos: Todo[],
  searchQuery: string,
  status: string,
): Todo[] => {
  let filteredTodos = [...todos].filter(todo =>
    todo.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
  );

  if (status === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (status === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  return filteredTodos;
};

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const { query: searchValue, status: selectValue } = useAppSelector(
    state => state.filter,
  );
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | []>([]);

  useEffect(() => {
    setFilteredTodos(filterTodos(todos, searchValue, selectValue));
  }, [searchValue, selectValue, todos]);

  const handleSelectTodo = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.set(todo));
  };

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
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleSelectTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={
                      selectedTodo && selectedTodo.id === todo.id
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
  );
};
