import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as currentTodoActions from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

const prepareTodoList = (
  todos: Todo[],
  query: string,
  status: Status,
): Todo[] => {
  let list = [...todos];

  if (status) {
    list = list.filter(item => {
      switch (status) {
        case 'active':
          return !item.completed;
        case 'completed':
          return item.completed;
        default:
          return true;
      }
    });
  }

  if (query) {
    const normilizedQuery = query.toLowerCase();

    list = list.filter(item => {
      const normalizedTitle = item.title.toLowerCase();

      return normalizedTitle.includes(normilizedQuery);
    });
  }

  return list;
};

export const TodoList = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();

  const todoList = prepareTodoList(todos, query, status);

  return (
    <>
      {!todoList.length ? (
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
            {todoList.map(todo => {
              const isCurrentTodoSelected = currentTodo?.id === todo.id;

              return (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={cn({
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
                      className={cn(
                        { 'has-text-danger': !todo.completed },
                        { 'has-text-success': todo.completed },
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
                      onClick={() =>
                        dispatch(
                          currentTodoActions.setTodo(
                            isCurrentTodoSelected ? null : todo,
                          ),
                        )
                      }
                    >
                      <span className="icon">
                        <i
                          className={cn(
                            'far',
                            { 'fa-eye': !isCurrentTodoSelected },
                            { 'fa-eye-slash': isCurrentTodoSelected },
                          )}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
