import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../hooks/useAppSelector';
import { currentTodoSlice } from '../../features/currentTodo';
import { getFilteredTodos } from '../../helpers/getFilteredTodos';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const visibleTodos = getFilteredTodos(todos, { query, status });

  return (
    <>
      {!visibleTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <i className="fas fa-check" />
              </th>
              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {visibleTodos.map(todo => {
              const { id, completed, title } = todo;
              const isSelected = selectedTodo && selectedTodo.id === id;

              return (
                <tr
                  data-cy="todo"
                  className={isSelected ? 'has-background-info-light' : ''}
                  key={id}
                >
                  <td className="is-vcentered">{id}</td>

                  <td className="is-vcentered">
                    {completed ? (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    ) : (
                      ''
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={
                        completed ? 'has-text-success' : 'has-text-danger'
                      }
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() =>
                        dispatch(currentTodoSlice.actions.selectTodo(todo))
                      }
                    >
                      <span className="icon">
                        <i
                          className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
