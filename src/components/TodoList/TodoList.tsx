import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from '../../api';
import { Loader } from '../Loader';
import { TodoFilter } from '../TodoFilter';
import { TodoModal } from '../TodoModal';
import { useAppSelector } from '../../app/store';
import { useDispatch } from 'react-redux';
import { setStatus, setQuery } from '../../features/filter';
import { clearCurrentTodo, setCurrentTodo } from '../../features/currentTodo';
import { setTodos } from '../../features/todos';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const [isLoading, setIsLoading] = useState(true);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos().then(fetchedTodos => {
      dispatch(setTodos(fetchedTodos));
      setIsLoading(false);
    });
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todoItem => {
      const matchesQuery = query
        ? todoItem.title.toLowerCase().includes(query.toLowerCase().trim())
        : true;

      let matchesFilter;

      switch (status) {
        case 'active':
          matchesFilter = !todoItem.completed;
          break;
        case 'completed':
          matchesFilter = todoItem.completed;
          break;
        default:
          matchesFilter = true;
      }

      return matchesQuery && matchesFilter;
    });
  }, [query, status, todos]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TodoFilter
        filter={status}
        setFilter={filter => dispatch(setStatus(filter))}
        query={query}
        setQuery={q => dispatch(setQuery(q))}
      />
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
          {filteredTodos.map(todoItem => (
            <tr
              key={todoItem.id}
              data-cy="todo"
              className={
                selectedTodo?.id === todoItem.id
                  ? 'has-background-info-light'
                  : ''
              }
            >
              <td className="is-vcentered">{todoItem.id}</td>
              <td className="is-vcentered">
                {todoItem.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todoItem.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todoItem.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(setCurrentTodo(todoItem))}
                >
                  <span className="icon">
                    <i
                      className={`far ${selectedTodo === todoItem ? 'fa-eye-slash' : 'fa-eye'}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => dispatch(clearCurrentTodo())}
        />
      )}
    </>
  );
};
