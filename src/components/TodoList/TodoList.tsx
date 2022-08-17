import classNames from 'classnames';
import { setTodo } from '../../features/selectedTodo';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onMixTodos: (todos: Todo[]) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onMixTodos,
}) => {
  const dispatch = useAppDispatch();
  const selelctedTodo = useAppSelector(state => state.selectedTodo);

  const selectTodo = (todo: Todo) => {
    dispatch(setTodo(todo));
  };

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
          <th>
            <button
              type="button"
              className="button"
              onClick={() => onMixTodos(todos)}
            >
              Mix Todos
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={classNames(
              {
                'has-background-info-light': todo.id === selelctedTodo?.id,
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
              <p className={classNames(
                { 'has-text-danger': !todo.completed },
                { 'has-text-success': todo.completed },
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selelctedTodo?.id === todo.id ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    selectTodo(todo);
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              )
                : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      selectTodo(todo);
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
