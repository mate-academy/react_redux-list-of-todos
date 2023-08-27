/* eslint-disable max-len */
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { filterTodos } from '../../helpers';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const setCurrentTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  const visibleTodos = status !== Status.All || query
    ? filterTodos(todos, status, query)
    : todos;

  const isAnyTodos = visibleTodos.length === 0;

  return (
    <>
      {isAnyTodos
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
        : (
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
                <tr data-cy="todo" key={todo.id}>
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={cn({
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
                      onClick={() => setCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i className={cn('far', {
                          'fa-eye': selectedTodo !== todo,
                          'fa-eye-slash': selectedTodo === todo,
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
