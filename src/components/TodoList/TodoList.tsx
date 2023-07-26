/* eslint-disable max-len */
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

interface TodoListProps {
  isLoading: boolean,
}

export const TodoList = ({ isLoading }: TodoListProps) => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  return (
    <>
      {!todos.length && !isLoading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
            const {
              id, title, completed,
            } = todo;

            const isSelected = id === currentTodo?.id;

            return (
              <tr
                data-cy="todo"
                className={isSelected ? 'has-background-info-light' : ''}
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
                  <p className={`has-text-${completed ? 'success' : 'danger'}`}>
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      dispatch(actions.setTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i className={`far fa-eye${isSelected ? '-slash' : ''}`} />
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
