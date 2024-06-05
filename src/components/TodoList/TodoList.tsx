import { FC } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';

type TPros = {
  currentTodo: (todo: Todo) => void;
  filteredTodos: Todo[];
};

export const TodoList: FC<TPros> = ({ currentTodo, filteredTodos }) => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const isSelected = (todo: Todo) => selectedTodo?.id === todo.id;

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {filteredTodos.length > 0 && (
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
            {filteredTodos.map((todo, index) => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={cn(
                  isSelected(todo) ? 'has-background-info-light' : '',
                )}
              >
                <td className="is-vcentered">{index + 1}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={cn(
                      todo.completed ? 'has-text-success' : 'has-text-danger',
                    )}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => currentTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': !isSelected(todo),
                          'fa-eye-slash': isSelected(todo),
                        })}
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
