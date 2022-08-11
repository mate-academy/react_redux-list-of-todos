import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { actions as actionsTodos } from '../../store/todosReducer';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();

  return (
    <table
      data-cy="listOfTodos"
      className="table is-narrow is-fullwidth"
    >
      <tbody>
        {todos.map(todo => {
          return (
            <tr
              className={todo.completed
                ? ('has-background-success-light has-text-success')
                : ('has-background-danger-light has-text-danger')}
              key={todo.id}
            >
              <td className="is-vcentered">
                <span className="icon is-size-5">
                  <i
                    className={classNames('fas', {
                      'fas fa-check-square': todo.completed,
                      'fa-square-xmark': !todo.completed,
                    })}
                  />
                </span>
              </td>
              <td className="is-vcentered is-expanded">
                {todo.title}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  className="button is-warning"
                  type="button"
                  onClick={() => {
                    dispatch(actionsTodos.choseTodo(todo.id));
                  }}
                >
                  {`Show : #${todo.id}`}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
