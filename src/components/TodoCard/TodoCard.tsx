import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTodo } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoCard: React.FC<Props> = ({ todo }) => {
  const { id, title } = todo;

  const dispatch = useAppDispatch();

  const selectedTodo = useAppSelector(state => state.currentTodo);

  // const { selectedTodoId, setSelectedTodoId, setDisplayTodoModal, setLoading } =
  //   useContext(TodosContext);

  // const eyeCickHandler = () => {
  //   setSelectedTodoId(id);
  //   setDisplayTodoModal(true);
  //   setLoading(true);
  // };

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': id % 2 === 0 })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {todo.completed ? (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        ) : (
          <span className="is-vcentered" />
        )}
      </td>
      <td className="is-vcentered">
        {todo.completed ? (
          <p className="has-text-success">{title}</p>
        ) : (
          <p className="has-text-danger">{title}</p>
        )}
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(selectTodo(todo))}
        >
          <span className="icon">
            {selectedTodo?.id === todo.id ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
