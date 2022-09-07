import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface Props {
  todos: Todo[],
  selectedTodo: Todo | null,
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos, selectedTodo } = props;
  const dispatch = useDispatch();

  const handleClick = (todoId: number) => {
    const selectedTask = todos.find(todo => todo.id === Number(todoId));

    if (selectedTask) {
      dispatch(currentTodoActions.setTodo(selectedTask));
    }
  };

  return (
    <>
      {todos.length === 0
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        ) : (
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
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={classNames(
                    {
                      'has-background-info-light': selectedTodo?.id === todo.id,
                    },
                  )}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span
                        className="icon"
                        data-cy="iconCompleted"
                      >
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={classNames(
                      {
                        'has-text-danger': todo.completed === true,
                        'has-text-success': todo.completed === false,
                      },
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
                      onClick={() => {
                        handleClick(todo.id);
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'far',
                            {
                              'fa-eye-slash': selectedTodo?.id === todo.id,
                              'fa-eye': selectedTodo?.id !== todo.id,
                            },
                          )}
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
