import { connect, ConnectedProps, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { RootState } from '../../app/store';

const mapState = (state: RootState) => {
  const { currentTodo } = state;

  return {
    currentTodo,
  };
};

const mapDispatch = {
  setTodo: currentTodoActions.setTodo,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & Todo;

const TodoItem: React.FC<Props> = (props) => {
  const {
    completed,
    title,
    id,
    currentTodo,
    setTodo,
  } = props;
  const dispatch = useDispatch();

  const handleShowDetails = () => {
    dispatch(setTodo({ ...props }));
  };

  return (
    <tr data-cy="todo">
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
          className={classNames(
            { 'has-text-success': completed },
            { 'has-text-danger': !completed },
          )}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            handleShowDetails();
          }}
        >
          <span className="icon">
            {currentTodo?.id === id ? (
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

export default connector(TodoItem);
