import { FC } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';

type TPros = {
  filteredTodos: Todo[];
};

export const TodoList: FC<TPros> = ({ filteredTodos }) => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const isSelected = (todo: Todo) => selectedTodo?.id === todo.id;

  return (
    <>
      {!filteredTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!filteredTodos.length && (
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
                className={cn({
                  'has-background-info-light': isSelected(todo),
                })}
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
                    className={cn({
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
                    onClick={() => dispatch(actions.setTodo(todo))}
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
