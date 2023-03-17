import classNames from 'classnames';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { setTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  renderedTodos: Todo[];
};

export const TableList: FC<Props> = ({ renderedTodos }) => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const handleClick = (clickedTodo: Todo) => {
    dispatch(setTodo(clickedTodo));
  };

  return (
    <>
      {!!renderedTodos.length && renderedTodos.map((todo) => {
        const { title, completed, id } = todo;

        return (
          <tr data-cy="todo" key={id}>
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
                onClick={() => handleClick(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'far',
                      { 'fa-eye': id !== selectedTodo?.id || !selectedTodo },
                      { 'fa-eye-slash': id === selectedTodo?.id },
                    )}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
