import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

interface TodoListProps {
  todos: Todo[];
  selectedTodoId: number;
}
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodoId,
}) => {
  const dispatch = useDispatch();

  return (
    <>
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
            const isCurrentTodoSelected = selectedTodoId === todo.id;

            return (
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames({
                  'has-background-info-light': isCurrentTodoSelected,
                })}
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
                    onClick={() =>
                      dispatch(currentTodoSlice.actions.selectTodoId(todo.id))
                    }
                  >
                    <span className="icon">
                      <i
                        className={
                          isCurrentTodoSelected
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
    </>
  );
};
