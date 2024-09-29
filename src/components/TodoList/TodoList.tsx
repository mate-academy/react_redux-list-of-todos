import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {actions as currentTodoActions} from '../../features/currentTodo';
import {Status} from '../../features/filter';


export const TodoList = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector<Todo | null>(state => state.currentTodo);
  const { todos, loading } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const getPreparedTodos = (query: string, status: string, todos: Todo[]): Todo[] => {
    let result = [...todos];
    const normalizedQuery = query.toLocaleLowerCase().trim();

    if(query) {
      result = result.filter(item => item.title.toLocaleLowerCase().includes(normalizedQuery));
    }

    switch (status) {
      case Status.completed:
        return result.filter(item => item.completed);
      case Status.active:
        return result.filter(item => !item.completed);
      default:
        return result
    }
  }

  const setCurrentTodo = (value: Todo | null) => dispatch(currentTodoActions.setCurrentTodo(value));

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

    {loading || <tbody>
      {getPreparedTodos(query, status, todos).map((todo: Todo) => (
        <tr
          data-cy="todo"
          className={classNames({
            'has-background-info-light':
            currentTodo && todo.id === currentTodo.id,
          })}
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
              className={classNames({
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
              onClick={() => {
                setCurrentTodo(todo);
              }}
            >
              <span className="icon">
                <i
                  className={classNames('far', {
                    'fa-eye-slash': currentTodo && todo.id === currentTodo.id,
                    'fa-eye': !(currentTodo && todo.id === currentTodo.id),
                  })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>}
  </table>
)};
