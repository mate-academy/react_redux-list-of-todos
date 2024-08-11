import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const todosExist = todos.length > 0;

  return (
    <>
      {!todosExist && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
      {todosExist && (
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
            {todos.map(todo => (
              <tr data-cy="todo" className="" key={todo.id}>
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
                    className={cn({
                      'has-text-danger': todo.completed === false,
                      'has-text-success': todo.completed === true,
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
                      dispatch(currentTodoSlice.actions.setTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye-slash': selectedTodo?.id === todo.id,
                          'fa-eye': selectedTodo?.id !== todo.id,
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
