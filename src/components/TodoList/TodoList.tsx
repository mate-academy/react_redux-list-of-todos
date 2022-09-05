import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../store';
import { actions } from '../../store/currentTodo';

export const TodoList = () => {
  const selectedTodo = useSelector(selectors.getTodo);
  const todos = useSelector(selectors.getTodos);
  const dispatch = useDispatch();

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
        {todos.filtered.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={selectedTodo?.id === todo.id
              ? 'has-background-info-light'
              : ''}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p
                className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => (dispatch(actions.setTodo(todo)))}
              >
                <span className="icon">
                  {selectedTodo?.id === todo.id
                    ? (<i className="far fa-eye-slash" />)
                    : (<i className="far fa-eye" />)}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
