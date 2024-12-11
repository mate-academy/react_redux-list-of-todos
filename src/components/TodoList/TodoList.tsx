/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { RootState } from '../../app/store';

interface Props {
  todoList: Todo[]
}

export const TodoList: React.FC<Props> = ({ todoList }) => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const isCompletedStyle = (todoStatus: boolean) => todoStatus ?
    'has-text-success'
    : 'has-text-danger';
  const isCheckedStyle = (currentId: number) => currentTodo?.id === currentId ?
    'fas fa-eye-slash'
    : 'far fa-eye';
  const dispatch = useDispatch();

  return (
    <>
      {todoList.length === 0 && <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>}

      {todoList.length > 0 && <table className="table is-narrow is-fullwidth">
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
          {todoList.map(todo => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed &&
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                }
              </td>

              <td className="is-vcentered is-expanded">
                <p className={isCompletedStyle(todo.completed)}>
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    dispatch(currentTodoActions.addCurrentTodo(todo))
                  }}
                >
                  <span className="icon">
                    <i className={isCheckedStyle(todo.id)} />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </>
  );
};
