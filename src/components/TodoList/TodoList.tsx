import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

type Params = {
  sort: string;
  filterQuery: string;
};

const TodoListComponent: React.FC<Props> = ({ todos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleSelect = (todo: Todo) => {
    if (currentTodo?.id === todo.id) {
      dispatch(actions.clear());

      return;
    }

    dispatch(actions.set(todo));
  };

  const preparedTodos = (
    items: Todo[],
    { sort, filterQuery }: Params,
  ): Todo[] => {
    let prepTodos = [...items];

    if (sort === 'active') {
      prepTodos = prepTodos.filter(todo => !todo.completed);
    }

    if (sort === 'completed') {
      prepTodos = prepTodos.filter(todo => todo.completed);
    }

    if (filterQuery) {
      const normalizedQuery = filterQuery.trim().toLowerCase();

      prepTodos = prepTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return prepTodos;
  };

  const visibleTodos = preparedTodos(todos, {
    sort: status,
    filterQuery: query,
  });

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
        {visibleTodos.length > 0 ? (
          visibleTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className="has-background-info-light"
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                <span
                  className="icon"
                  data-cy={todo.completed ? 'iconCompleted' : ''}
                >
                  <i className={todo.completed ? 'fas fa-check' : 'fas'}></i>
                </span>
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
                  onClick={() => handleSelect(todo)}
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
          ))
        ) : (
          <tr>
            <td colSpan={4}>No todo found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export const TodoList: React.FC<Props> = React.memo(TodoListComponent);
