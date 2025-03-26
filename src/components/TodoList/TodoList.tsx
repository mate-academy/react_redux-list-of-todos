import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList = () => {
  const { todos, currentTodo } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  function handleSetCurrentTodo(todo: Todo) {
    dispatch(currentTodoSlice.actions.changeCurrentTodo(todo));
  }

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

      <tbody>
        {todos.map(todo => {
          const { completed, id, title } = todo;

          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': id === currentTodo?.id,
              })}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={cn({
                    'has-text-danger': !completed,
                    'has-text-success': completed,
                  })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSetCurrentTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': id !== currentTodo?.id,
                        'fa-eye-slash': id === currentTodo?.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
