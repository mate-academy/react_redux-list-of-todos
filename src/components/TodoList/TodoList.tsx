import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { actions } from '../../features/currentTodo';
import { getFilteredTodos } from '../../utils/filteredTodos';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const filteredTodos = getFilteredTodos(todos, status as Status, query);

  return (
    <table className="table is-narrow is-fullwidth">
      <>
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
            const isSelected = todo.id === currentTodo?.id;

            return (
              <tr
                data-cy="todo"
                className={cn({ 'has-background-info-light': isSelected })}
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
                  <p
                    className={cn({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
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
                          'fa-eye': !isSelected,
                          'fa-eye-slash': isSelected,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </>
    </table>
  );
};
