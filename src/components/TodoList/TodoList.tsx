import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currTodoActions } from '../../features/currentTodo';

export const TodoList = () => {
  const activeTodo = useAppSelector(state => state.activeTodo.currTodo);
  const searchQuery = useAppSelector(state => state.filter.query);
  const filter = useAppSelector(state => state.filter.status);
  const todos = useAppSelector(state => state.todos.todos);
  const dispatch = useAppDispatch();

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    if (searchQuery.trim()) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      );
    }

    filteredTodos = filteredTodos.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        case 'all':
          return true;
      }
    });

    return filteredTodos;
  }, [todos, searchQuery, filter]);

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
        {visibleTodos.map(todo => (
          <tr
            data-cy="todo"
            className={
              activeTodo?.id === todo.id ? 'has-background-info-light' : ''
            }
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
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
                onClick={() => dispatch(currTodoActions.setCurrTodos(todo))}
              >
                <span className="icon">
                  <i
                    className={`far fa-eye${activeTodo?.id === todo.id ? '-slash' : ''}`}
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
