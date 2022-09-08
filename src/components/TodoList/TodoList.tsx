import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TODO_ID_ACTIONS_CREATOR } from '../../features/currentTodoId';
import { SELECTORS } from '../../selectors/selectors';
import { FilterTypes } from '../../types/FilterTypes';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector(SELECTORS.todosSelector);
  const currentTodoId = useSelector(SELECTORS.currentTodoIdSelector);
  const filters = useSelector(SELECTORS.filterSelector);

  const currentTodo = useMemo(() => (
    todos.find(todo => todo.id === currentTodoId)
  ), [currentTodoId]);

  const filteredTodos = useMemo(() => {
    return todos.filter(({ title, completed }) => {
      const filteringByTitle = title.toLowerCase().includes(
        filters.query.toLowerCase(),
      );

      switch (filters.status) {
        case FilterTypes.All:
          return filteringByTitle;

        case FilterTypes.Active:
          return filteringByTitle && !completed;

        case FilterTypes.Completed:
          return filteringByTitle && completed;

        default:
          return filteringByTitle;
      }
    });
  }, [filters.query, todos, filters.status]);

  return (
    <>
      {filteredTodos.length > 0
        ? (
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
              {filteredTodos.map(todo => {
                return (
                  <tr
                    data-cy="todo"
                    className={classNames(
                      {
                        'has-background-info-light':
                        currentTodo?.id === todo.id,
                      },
                    )}
                    key={todo.id}
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
                      <p className={
                        todo.completed
                          ? 'has-text-success'
                          : 'has-text-danger'
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
                        onClick={() => dispatch(
                          TODO_ID_ACTIONS_CREATOR.setTodoId(todo.id),
                        )}
                      >
                        <span className="icon">
                          <i className={
                            currentTodo?.id === todo.id
                              ? 'far fa-eye-slash'
                              : 'far fa-eye'
                          }
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
        : (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}
    </>
  );
};
